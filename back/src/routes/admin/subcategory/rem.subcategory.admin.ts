/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import { verifyAccessTokenAdmin } from "../../../helpers/jtw";

import { Data, ICategory, ISubcategory} from "../../../models/Data.model";

/* ----- Code ----- */

const router : Router = Router();

/**
 * @swagger
 * /admin/subcategory/rem:
 *   delete:
 *     security:
 *       - JWT: []
 *     description: Remove an existing subcategory from a category.
 *     tags: [Admin, Subcategories]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: Subcategory's data to remove.
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
 *                 description: New subcategory name.
 *     responses:
 *       200:
 *         description: Subcategory removed.
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
    if (!req.body.category || !req.body.subcategory)
        return (res.status(400).send({ error : "Category and subcategory are required" }));
    const category : ICategory = await Data.findOne({name: req.body.category});
    if (!category)
        return (res.status(400).send({error: "Category not found."}));
    if (!category.subcategories.find((e) => e.name == req.body.subcategory))
        return (res.status(400).send({error: "Subcategory not found."}));
    const subcategories : ISubcategory[] = category.subcategories.filter((e) => e.name != req.body.subcategory);
    await Data.updateOne({name: category.name}, {subcategories : subcategories});
    return (res.status(200).send({message: "Subcategory removed."}));
});

export default router;