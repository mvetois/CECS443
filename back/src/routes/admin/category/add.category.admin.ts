/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import { verifyAccessTokenAdmin } from "../../../helpers/jtw";

import { Data, ICategory, ISubcategory } from "../../../models/Data.model";

/* ----- Code ----- */

const router : Router = Router();

/**
 * @swagger
 * /admin/category/add:
 *   post:
 *     security:
 *       - JWT: []
 *     description: Add a new category to a category.
 *     tags: [Admin, Categories]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: Category's name
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *             properties:
 *               category:
 *                 type: string
 *                 description: Category name.
 *     responses:
 *       200:
 *         description: Category added.
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
    if (!req.body.category)
        return (res.status(400).send({ error : "Category name are required" }));
    const category : ICategory = await Data.findOne({name: req.body.category});
    if (category)
        return (res.status(400).send({error: "Category already exists"}));
    const newCategory = new Data({name: req.body.category, subcategories: []});
    await newCategory.save();

    return (res.status(200).send({message: "Category added."}));
});

export default router;