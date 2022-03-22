/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import { verifyAccessTokenAdmin } from "../../../helpers/jtw";

import { Data, ICategory, ISubcategory, IData } from "../../../models/Data.model";

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
        return (res.status(400).send({error: "Category and subcategory are required"}));
    if (!req.body.data.name || !req.body.data.description || !req.body.data.lang || !req.body.data.data)
        return (res.status(400).send({error: "Name, description, lang and data are required"}));
    if (req.body.data.lang !== "FR" && req.body.data.lang !== "EN")
        return (res.status(400).send({error: "Lang must be FR or EN"}));
    const categories : ICategory[] = await Data.find({}, {'_id': false});
    if (!categories)
        return (res.status(400).send({error: "Their is no categories"}));
    const category : ICategory = categories.find((e) => e.name == req.body.category);
    if (!category)
        return (res.status(400).send({error: "Category not found."}));
    const subcategory : ISubcategory = category.subcategories.find((e) => e.name == req.body.subcategory);
    if (!subcategory)
        return (res.status(400).send({error: "Subcategory not found."}));

    const data : IData = {
        name: req.body.data.name,
        description: req.body.data.description,
        lang: req.body.data.lang,
        data: req.body.data.data
    };
    subcategory.data.push(data);
    await Data.updateOne({name: category.name}, {$set: {subcategories: category.subcategories}});
    return (res.status(200).send({message: "Data added"}));
});

export default router;