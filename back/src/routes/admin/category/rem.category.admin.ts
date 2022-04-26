/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import { verifyAccessTokenAdmin } from "../../../helpers/jtw";

import { Data, ICategory, ISubcategory} from "../../../models/Data.model";

/* ----- Code ----- */

const router : Router = Router();

/**
 * @swagger
 * /admin/category/rem:
 *   delete:
 *     security:
 *       - JWT: []
 *     description: Remove an existing category.
 *     tags: [Admin, Categories]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: Category name.
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
 *         description: Category removed.
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
    if (!req.body.category)
        return (res.status(400).send({ error : "Category name are required" }));
    const category : ICategory = await Data.findOne({name: req.body.category});
    if (!category)
        return (res.status(400).send({error: "Category not found."}));

    await Data.deleteOne({name: req.body.category});
    return (res.status(200).send({message: "Category removed."}));
});

export default router;