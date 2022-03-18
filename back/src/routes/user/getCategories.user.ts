/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import { verifyAccessToken } from "../../helpers/jtw";

import { Data, ICategory } from "../../models/Data.model";

/* ----- Code ----- */

const router : Router = Router();

/**
 * @swagger
 * /user/getcategories:
 *   get:
 *     security:
 *	     - JWT: []
 *     description: Requires a valid JWT Barer token. Get all the categories and subcategories.
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: Subcategories name.
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
router.get("/", verifyAccessToken,  async (req : Request, res : Response) => {

    const categories : ICategory[] = await Data.find({}, {"_id": false});
    if (!categories)
        return (res.status(400).send({error: "Their is no categories"}));
    const formatedCategories = categories.map((item) => ({
        name: item.name,
        subcategories: item.subcategories.reduce((acc, cur) => {
            return [...acc, { name: cur.name }];
        }, [])
    }));

    return (res.status(200).send(formatedCategories));
});

export default router;