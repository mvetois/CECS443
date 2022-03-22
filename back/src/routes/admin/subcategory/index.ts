/* ----- Imports ----- */

import { Router } from "express";

import Add from "./add.subcategory.admin";

/* ----- Code ----- */

const router : Router = Router();

router.use("/add", Add);

/**
 * @swagger
 * tags:
 *   name: Subcategories
 *   description: Subcategories management
 */

export default router;