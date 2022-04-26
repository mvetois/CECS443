/* ----- Imports ----- */

import { Router } from "express";

import Category from "./category";
import SubCategory from "./subcategory";
import Data from "./data";

/* ----- Code ----- */

const router : Router = Router();

router.use("/category", Category);
router.use("/subcategory", SubCategory);
router.use("/data", Data);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

export default router;