/* ----- Imports ----- */

import supertest from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";

import app from "../src/index";

/* ----- Code ----- */

describe("GET - Ping", () => {
    it("server is online", async () => {
        const response = await supertest(app).get("/api");
        expect(response.status).to.equal(200);
    });
});