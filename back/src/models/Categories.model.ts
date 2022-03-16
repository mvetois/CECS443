/* ----- Imports ----- */

import mongoose, { Schema } from "mongoose";

/* ----- Code ----- */

const categoriesSchema = new Schema({
    category: {
        type: Array,
        required: true,
        unique: true,
        lowercase: true
    },
});

export const Categories = mongoose.model("Categories", categoriesSchema);