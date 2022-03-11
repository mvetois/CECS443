/* ----- Imports ----- */


/* ----- Code ----- */

const SwaggerOptions = {
    definition: {
        openapi: "3.0.0",
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
    },
    apis: ["src/**/*.ts"],
};

export default SwaggerOptions;