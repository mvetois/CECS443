/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import mongoose from "mongoose";

import { verifyAccessTokenAdmin } from "../../../helpers/jtw";

import { Data, ICategory, ISubcategory, IData } from "../../../models/Data.model";
import { DataFile } from "../../../models/DataFile.model";

/* ----- Code ----- */

const router : Router = Router();

/**
 * @swagger
 * /admin/data/add:
 *   post:
 *     security:
 *       - JWT: []
 *     description: Add new data.
 *     tags: [Admin, Data]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: Data's data for add.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *               - subcategory
 *               - data
 *             properties:
 *               category:
 *                 type: string
 *                 description: Category name.
 *               subcategory:
 *                 type: string
 *                 description: Subcategory name.
 *               data:
 *                 type: object
 *                 required:
 *                   - name
 *                   - description
 *                   - lang
 *                   - data
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Data's name.
 *                   description:
 *                     type: string
 *                     description: Data's description.
 *                   lang:
 *                     type: string
 *                     description: Data's language (FR or EN).
 *                   data:
 *                     type: string
 *                     description: Data's data (Base64).
 *     responses:
 *       200:
 *         description: Data added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: sucess message.
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   descriptipn: Error message.
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   descriptipn: Error message.
 */
router.post("/", verifyAccessTokenAdmin, async (req : Request, res : Response) => {
    if (!req.body.category || !req.body.subcategory || !req.body.data)
        return (res.status(400).send({error: "Category, subcategory and data are required"}));
    if (!req.body.data.name || !req.body.data.description || !req.body.data.lang || !req.body.data.data)
        return (res.status(400).send({error: "Name, description, lang and data are required"}));
    if (req.body.data.lang !== "FR" && req.body.data.lang !== "EN")
        return (res.status(400).send({error: "Lang must be FR or EN"}));
    const categories : ICategory[] = await Data.find({}, {'_id': false});
    if (!categories)
        return (res.status(400).send({error: "There are no categories"}));
    const category : ICategory = categories.find((e) => e.name == req.body.category);
    if (!category)
        return (res.status(400).send({error: "Category not found."}));
    const subcategory : ISubcategory = category.subcategories.find((e) => e.name == req.body.subcategory);
    if (!subcategory)
        return (res.status(400).send({error: "Subcategory not found."}));
    const SameName : IData = subcategory.data.find((e) => e.name == req.body.data.name);
    if (SameName)
        return (res.status(400).send({error: "Data already exists."}));

    const dataFileId = new mongoose.Types.ObjectId();
    const dataFile = new DataFile({
        _id: dataFileId,
        data: req.body.data.data
    });
    let error = null;
    await dataFile.save().catch((e) => error = e);
    if(!(await DataFile.findById(dataFileId)) || error) return res.status(400).send({error: "File failed to upload " + error})

    const data : IData = {
        name: req.body.data.name,
        description: req.body.data.description,
        lang: req.body.data.lang,
        data: dataFileId
    };
    
    subcategory.data.push(data);
    await Data.updateOne({name: category.name}, {$set: {subcategories: category.subcategories}});
    return (res.status(200).send({message: "Data added"}));
});

export default router;