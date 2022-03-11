/* ----- Imports ----- */

import express, { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import SwaggerOptions from "./swagger";
import routes from "./routes/index";

/* ----- Code ----- */

const app : Express = express();
const port = 5000;

app.listen(port, () => {
    console.log("API is running on port " + port);
});

app.use("/doc", swaggerUi.serve ,swaggerUi.setup(swaggerJSDoc(SwaggerOptions)));

app.use("/api", routes);