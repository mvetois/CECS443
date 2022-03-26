/* ----- Imports ----- */

import mongoose from "mongoose";

/* ----- Code ----- */

mongoose.connect("mongodb://localhost:27017", {user: "root", pass: "pass", dbName: "project"})
    .then(() => { console.log("MongoDB connected !") })
    .catch((err) => { console.log(err.message) });

mongoose.connection.on("connected", () => {
    console.log("API sucessfully connected to MongoDB !");
});

mongoose.connection.on("error", (err) => {
    console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected !");
});

process.on("SIGINT", async () => {
    await mongoose.connection.close(() => {
        console.log("MongoDB disconnected through app termination !");
        process.exit(0);
    });
});