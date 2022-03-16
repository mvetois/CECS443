/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import Register from "./register.user";
import Login from "./login.user";
import GetCategories from "./getCategories.user";

/* ----- Code ----- */

const router : Router = Router();

router.use("/register", Register);
router.use("/login", Login);
router.use("/getcategories", GetCategories);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

export default router;