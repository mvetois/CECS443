/* ----- Imports ----- */

import express, { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import SwaggerOptions from "./swagger";
import routes from "./routes/index";

require("./initDB");

/* ----- Code ----- */

const app : Express = express();
const port = 5000;

app.listen(port, () => {
    console.log("API is running on port " + port);
});

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true}));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type, authorization');
    next();
});

app.use("/doc", swaggerUi.serve ,swaggerUi.setup(swaggerJSDoc(SwaggerOptions)));

app.use("/api", routes);

export default app;