/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import User from "./user/index"
import Admin from "./admin/index"

/* ----- Code ----- */

const router : Router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Ping the API.
 *     description: Check if the API is online.
 *     tags: [Ping]
 *     responses:
 *       200:
 *         description: The API response.
 *         content:
 *           application/json:
 *             name:
 *               type: string
 *               description: A message from the API if it's online.
 *               example: API is running
 */
router.get("/", (req : Request, res : Response) => {
    res.status(200).send("API is running");
});

router.use("/user", User)
router.use("/admin", Admin)

export default router;