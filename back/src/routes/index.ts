/* ----- Imports ----- */

import { Request, Response } from "express";
import { Router } from "express";

/* ----- Code ----- */

const router : Router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Ping the API.
 *     description: Check if the API is online.
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

export default router;