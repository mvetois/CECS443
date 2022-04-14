/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import Register from "./register.user";
import Login from "./login.user";
import Logout from "./logout.user";
import UpdatePassword from "./updpwd.user";
import GetCategories from "./getCategories.user";
import GetData from "./getData.user";

/* ----- Code ----- */

const router : Router = Router();

router.use("/register", Register);
router.use("/login", Login);
router.use("/logout", Logout);
router.use("/updatepassword", UpdatePassword);
router.use("/getcategories", GetCategories);
router.use("/getdata", GetData);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

export default router;