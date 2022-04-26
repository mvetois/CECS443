/* ----- Imports ----- */

import mongoose, { Schema } from "mongoose";

/* ----- Code ----- */

type fileId = string;

export interface ICategory {
    name: string;
    subcategories: ISubcategory[];
};

export interface ISubcategory {
    name: string;
    data: IData[];
};

export interface IData {
    name: string;
    description: string;
    lang: "FR" | "EN";
    data: fileId;
};

const dataSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subcategories: {
        type: Array,
        required: true,
        lowercase: true
    },
});

export const Data = mongoose.model("Data", dataSchema);