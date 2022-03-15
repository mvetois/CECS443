/* ----- Imports ----- */

import mongoose, { Schema, Model } from "mongoose";

/* ----- Code ----- */

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false,
        required: true
    }
});

export const User = mongoose.model("User", userSchema);