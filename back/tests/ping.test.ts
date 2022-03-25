/* ----- Imports ----- */

import supertest from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";

import app from "../src/index";

/* ----- Code ----- */

describe("Ping", () => {
    it("should return 200", async () => {
        const response = await supertest(app).get("/api/");
        expect(response.status).to.equal(200);
    });
    it("should return 404", async () => {
        const response = await supertest(app).get("/api/");
        expect(response.status).to.equal(200);
    });
});