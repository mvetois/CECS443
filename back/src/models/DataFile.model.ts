/* ----- Imports ----- */

import mongoose, { Schema } from "mongoose";

/* ----- Code ----- */

const dataFileSchema = new Schema({
    data: {
        type: String,
        required: true
    }
});

export const DataFile = mongoose.model("DataFile", dataFileSchema);