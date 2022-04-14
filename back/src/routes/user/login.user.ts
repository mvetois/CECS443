/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import { signAccessToken } from "../../helpers/jtw";

import { User } from "../../models/User.model";

const cookie = require('cookie');

/* ----- Code ----- */

const router : Router = Router();

/**
 * @swagger
 * /user/login:
 *   post:
 *     description: Login the user to the application
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *         description: User's data for the login.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   description: User's email.
 *                 password:
 *                   type: string
 *                   description: User's password.
 *     responses:
 *       200:
 *         description: Logged in
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
router.post("/", async (req : Request, res : Response) => {
    if (!req.body.email || !req.body.password)
        return (res.status(400).send({error: "Email and password are required"}));

    const user = await User.findOne({email: req.body.email, password: req.body.password});
    if (!user)
        return (res.status(400).send({error: "User not found"}));

    const accessToken : Promise<any> = await signAccessToken(user.email, user.admin);
    res.setHeader('Set-Cookie', cookie.serialize("accessToken", accessToken, {
        path: "/",
        sameSite: true,
        httpOnly: true,
        secure: true,
        maxAge: 60*60*2 //2 hours
    }))

    return (res.status(200).send({token: accessToken}));
});

export default router;