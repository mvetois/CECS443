/* ----- Imports ----- */

import supertest from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";

import app from "../src/index";
import { loginUser } from "./helper";

/* ----- Code ----- */

describe("GET - User get categories and subcategoty", () => {
    var auth = {token: ""};
    before(loginUser(auth, {email: "test@test.com", password: "ThisIsANewPassword"}));
    it("User succesfully get categories", async () => {
        const response = await supertest(app).get("/api/user/getcategories").set("Authorization", "bearer " + auth.token);
        expect(response.status).to.equal(200);
    });
    it("Unauthorized", async () => {
        const response = await supertest(app).get("/api/user/getcategories");
        expect(response.status).to.equal(401);
    });
});

describe("GET - User get datas from subcategoty", () => {
    var auth = {token: ""};
    before(loginUser(auth, {email: "test@test.com", password: "ThisIsANewPassword"}));
    it("User succesfully get data from subcategoty", async () => {
        const response = await supertest(app).get("/api/user/getdata").query({
            category: "testCI",
            subcategory: "one"
        }).set("Authorization", "bearer " + auth.token);
        expect(response.status).to.equal(200);
    });
    it("User get data who does not exist", async () => {
        const response = await supertest(app).get("/api/user/getdata").query({
            category: "testCI",
            subcategory: "two"
        }).set("Authorization", "bearer " + auth.token);
        expect(response.status).to.equal(400);
    });
    it("Unauthorized", async () => {
        const response = await supertest(app).get("/api/user/getdata").query({
            category: "testCI",
            subcategory: "one"
        });
        expect(response.status).to.equal(401);
    });
});