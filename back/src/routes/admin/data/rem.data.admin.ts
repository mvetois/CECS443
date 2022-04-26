/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import { verifyAccessTokenAdmin } from "../../../helpers/jtw";

import { Data, ICategory, ISubcategory, IData } from "../../../models/Data.model";
import { DataFile } from "../../../models/DataFile.model";

/* ----- Code ----- */

const router : Router = Router();

/**
 * @swagger
 * /admin/data/rem:
 *   delete:
 *     security:
 *       - JWT: []
 *     description: Remove an existing data.
 *     tags: [Admin, Data]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: Data's name for remove.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *               - subcategory
 *               - name
 *             properties:
 *               category:
 *                 type: string
 *                 description: Category name.
 *               subcategory:
 *                 type: string
 *                 description: Subcategory name.
 *               name:
 *                 type: string
 *                 description: Name of the document to remove.
 *     responses:
 *       200:
 *         description: Data Removed.
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
router.delete("/", verifyAccessTokenAdmin, async (req : Request, res : Response) => {
    if (!req.body.category || !req.body.subcategory || !req.body.name)
        return res.status(400).json({ error : "Category, subcategory and name are required" });
    const category : ICategory = await Data.findOne({name: req.body.category});
    if (!category)
        return (res.status(400).send({error: "Category not found."}));
    const subcategories : ISubcategory[] = category.subcategories;
    const subcategory : ISubcategory = subcategories.find((e) => e.name == req.body.subcategory);
    if (!subcategory)
        return (res.status(400).send({error: "Subcategory not found."}));
    const data : IData = subcategory.data.find((e) => e.name == req.body.name);
    if (!data)
        return (res.status(400).send({error: "Data not found."}));

    await DataFile.deleteOne({ _id: data.data });
    subcategory.data = subcategory.data.filter((e) => e.name != req.body.name);
    subcategories.splice(subcategories.indexOf(subcategory), 1, subcategory);
    await Data.updateOne({name: category.name}, {subcategories : subcategories});
    return (res.status(200).send({message: "Data removed."}));
});

export default router;