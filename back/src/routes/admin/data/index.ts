/* ----- Imports ----- */

import { Router } from "express";

import Add from "./add.data.admin";
import Rem from "./rem.data.admin";

/* ----- Code ----- */

const router : Router = Router();

router.use("/add", Add);
router.use("/rem", Rem);

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Data management
 */

export default router;