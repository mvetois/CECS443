/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import { signAccessToken, verifyAccessToken } from "../../helpers/jtw";

import { User } from "../../models/User.model";

const cookie = require('cookie');

/* ----- Code ----- */

const router : Router = Router();

/**
 * @swagger
 * /user/logout:
 *   post:
 *     description: Logout the user from the application
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The user token.
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
 */
router.post("/", verifyAccessToken,  async (req : Request, res : Response) => {
    res.setHeader('Set-Cookie', cookie.serialize("accessToken", 0, {
        path: "/",
        maxAge: 0 //2 hours
    }))

    return (res.status(200).send({message: "Successfully logged out"}));
});

export default router;