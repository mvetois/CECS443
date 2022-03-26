/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import { signAccessToken } from "../../helpers/jtw";

import { User } from "../../models/User.model";

/* ----- Code ----- */

const router : Router = Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     description: Register to the application
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *         description: User's data for the register.
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
 *       201:
 *         description: Created
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

    if(await User.findOne({email: req.body.email}))
        return (res.status(400).send({error: "Email already exists"}));

    const user = new User({email: req.body.email, password: req.body.password, admin: false});
    await user.save();

    const accessToken : Promise<any> = await signAccessToken(user.email, user.admin);
    return (res.status(201).send({token: accessToken}));
});

export default router;