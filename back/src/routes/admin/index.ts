/* ----- Imports ----- */

import { Router } from "express";

import Data from "./data/index";

/* ----- Code ----- */

const router : Router = Router();

router.use("/data", Data);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

export default router;