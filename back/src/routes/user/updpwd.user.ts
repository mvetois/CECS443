/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import { verifyAccessToken } from "../../helpers/jtw";

import { User } from "../../models/User.model";

/* ----- Code ----- */

const router : Router = Router();

/**
 * @swagger
 * /user/updatepassword:
 *   post:
 *     security:
 *	     - JWT: []
 *     description: Update user password.
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *         description: User's data for update the password.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *                 - newpassword
 *               properties:
 *                 email:
 *                   type: string
 *                   description: User's email.
 *                 password:
 *                   type: string
 *                   description: User's password.
 *                 newpassword:
 *                   type: string
 *                   description: User's new password.
 *     responses:
 *       200:
 *         description: Updated successfully.
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
router.post("/", verifyAccessToken, async (req : Request, res : Response) => {
    if (!req.body.email || !req.body.password || !req.body.newpassword)
        return (res.status(400).send({error: "Email, password and new password are required"}));

    const user = await User.findOne({email: req.body.email, password: req.body.password});
    if (!user)
        return (res.status(400).send({error: "User not found"}));
    user.password = req.body.newpassword;
    user.save();
    return (res.status(200).send({message: "Password updated"}));
});

export default router;
