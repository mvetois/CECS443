/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import Register from "./register.user";

/* ----- Code ----- */

const router : Router = Router();

router.use("/register", Register);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

export default router;