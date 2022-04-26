/* ----- Imports ----- */

import { Router, Request, Response } from "express";

import { verifyAccessToken } from "../../helpers/jtw";

import { Data, ICategory, ISubcategory, IData } from "../../models/Data.model";
import { DataFile } from "../../models/DataFile.model";

/* ----- Code ----- */

const router : Router = Router();

/**
 * @swagger
 * /user/getdata:
 *   get:
 *     security:
 *	     - JWT: []
 *     description: Requires a valid JWT Barer token. Get all the categories and subcategories.
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: category
 *         required: true
 *         description: Category name.
 *         schema:
 *           type: string
 *       - in: query
 *         name: subcategory
 *         required: true
 *         description: Subcategory name.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     lang:
 *                       type: string
 *                     data:
 *                       type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   descriptipn: Error message.
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   descriptipn: Error message.
 */
router.get("/", verifyAccessToken,  async (req : Request, res : Response) => {

    if (!req.query || !req.query.category || !req.query.subcategory)
        return (res.status(400).send({error: "No category or subcategory specified."}));
    const categories : ICategory[] = await Data.find({}, {'_id': false});
    if (!categories)
        return (res.status(400).send({error: "Their is no categories"}));

    const category : ICategory = categories.find((e) => e.name == req.query.category);
    if (!category)
        return (res.status(400).send({error: "Category not found."}));
    const subcategory : ISubcategory = category.subcategories.find((e) => e.name == req.query.subcategory);
    if (!subcategory)
        return (res.status(400).send({error: "Subcategory not found."}));
    let returnedSubcategory = {
        name: subcategory.name,
        data: []
    };

    for(let i = 0; i < subcategory.data.length; ++i) {
        let file = await DataFile.findById(subcategory.data[i].data);
        if(!file) return (res.status(400).send({error: subcategory.data[i].name + " cannot be found"}));

        returnedSubcategory.data.push({
            name: subcategory.data[i].name,
            description: subcategory.data[i].description,
            lang: subcategory.data[i].lang,
            data: file.data
        });
    }

    return (res.status(200).send(JSON.stringify(returnedSubcategory)));
});

export default router;


