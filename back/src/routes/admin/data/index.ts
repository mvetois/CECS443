/* ----- Imports ----- */

import { Router } from "express";

import Add from "./add.data.admin";

/* ----- Code ----- */

const router : Router = Router();

router.use("/add", Add);

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Data management
 */

export default router;