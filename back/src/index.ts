import express, { Express, Request, Response } from "express";

const app : Express = express();
const port = 5000;

app.listen(port, () => {
    console.log("API is running on port " + port);
});

app.get("/ping", (req : Request, res : Response) => {
    res.status(200).send("API is running");
})