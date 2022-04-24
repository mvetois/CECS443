/* ----- Imports ----- */

import { Router } from "express";

import Add from "./add.category.admin";
import Rem from "./rem.category.admin";

/* ----- Code ----- */

const router : Router = Router();

router.use("/add", Add);
router.use("/rem", Rem);

/**
 * @swagger
 * tags:
 *   name: Subcategories
 *   description: Subcategories management
 */

export default router;