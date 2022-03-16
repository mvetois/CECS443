/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import { signAccessToken, verifyAccessToken } from "../../helpers/jtw";

import { Categories } from "../../models/Categories.model";

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
 *         description: Created
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

    const categoriesList = await Categories.find({}, {'_id': false});
    if (!categoriesList)
        return (res.status(400).send({error: "Their is no categories"}));
    return (res.status(200).send(categoriesList));
});

export default router;