/* ----- Imports ----- */

import { Options } from "swagger-jsdoc";

/* ----- Code ----- */

const SwaggerOptions : Options = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Epitech document displayer API",
            version: "1.0.0",
            description: "This is a simple API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "mvetois",
                url: "https://mvetois.fr",
                email: "contact@mvetois.fr",
            },
        },
        servers: [
            {
                url: "http://localhost:5000/api/",
            },
        ],
        components: {
            securitySchemes: {
                JWT: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    bearerFormat: "JWT"
                },
            }
        },
    },
    apis: ["src/**/*.ts"],
    swagger: "2.0"
};

export default SwaggerOptions;