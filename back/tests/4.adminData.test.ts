/* ----- Imports ----- */

import supertest from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";

import app from "../src/index";
import { loginUser } from "./helper";
import { Data } from "../src/models/Data.model";

/* ----- Code ----- */

describe("POST - Admin create a subcategory", () => {
    const auth = {token: ""};
    before(async () => {
        await Data.deleteMany({});
        const data = new Data({name: "testCI", subcategories: []});
        await data.save();
    });
    before(loginUser(auth, {email: "admin@test.com", password: "ThisIsAPassword"}))
    it("Create a subcategoty", async () => {
        const response = await supertest(app).post("/api/admin/subcategory/add").send({
            category: "testCI",
            subcategory: "one"
        }).set("Authorization", "bearer " + auth.token);
        expect(response.status).to.equal(200);
        const responseTwo = await supertest(app).post("/api/admin/subcategory/add").send({
            category: "testCI",
            subcategory: "two"
        }).set("Authorization", "bearer " + auth.token);
        expect(responseTwo.status).to.equal(200);
    });
    it("Subcategoty allready exist", async () => {
        const response = await supertest(app).post("/api/admin/subcategory/add").send({
            category: "testCI",
            subcategory: "one"
        }).set("Authorization", "bearer " + auth.token);
        expect(response.status).to.equal(400);
    });
    it("Unauthorized", async () => {
        const response = await supertest(app).post("/api/admin/subcategory/add").send({
            category: "testCI",
            subcategory: "one"
        });
        expect(response.status).to.equal(401);
    });
});

describe("DELETE - Admin delete a subcategory", () => {
    const auth = {token: ""};
    before(loginUser(auth, {email: "admin@test.com", password: "ThisIsAPassword"}))
    it("Delete a subcategoty", async () => {
        const response = await supertest(app).delete("/api/admin/subcategory/rem").send({
            category: "testCI",
            subcategory: "two"
        }).set("Authorization", "bearer " + auth.token);
        expect(response.status).to.equal(200);
    });
    it("Subcategoty allready exist", async () => {
        const response = await supertest(app).delete("/api/admin/subcategory/rem").send({
            category: "testCI",
            subcategory: "two"
        }).set("Authorization", "bearer " + auth.token);
        expect(response.status).to.equal(400);
    });
    it("Unauthorized", async () => {
        const response = await supertest(app).delete("/api/admin/subcategory/rem").send({
            category: "testCI",
            subcategory: "two"
        });
        expect(response.status).to.equal(401);
    });
});

describe("POST - Admin create a data", () => {
    const auth = {token: ""};
    before(loginUser(auth, {email: "admin@test.com", password: "ThisIsAPassword"}))
    it("Create a data in a subcategory", async () => {
        const response = await supertest(app).post("/api/admin/data/add").send({
            category: "testCI",
            subcategory: "one",
            data: {
                name: "Firts Data",
                description: "This is a test data",
                lang: "FR",
                data: "BASE64_DATA"
            }
        }).set("Authorization", "bearer " + auth.token);
        expect(response.status).to.equal(200);
        const responseTwo = await supertest(app).post("/api/admin/data/add").send({
            category: "testCI",
            subcategory: "one",
            data: {
                name: "Second Data",
                description: "This is a test data",
                lang: "FR",
                data: "BASE64_DATA"
            }
        }).set("Authorization", "bearer " + auth.token);
        expect(responseTwo.status).to.equal(200);
    });
    it("Data bad request", async () => {
        const response = await supertest(app).post("/api/admin/data/add").send({
            category: "testCI",
            subcategory: "one",
            data: {}
        }).set("Authorization", "bearer " + auth.token);
        expect(response.status).to.equal(400);
    });
    it("Unauthorized", async () => {
        const response = await supertest(app).post("/api/admin/data/add").send({
            category: "testCI",
            subcategory: "one",
            data: {
                name: "Second Data",
                description: "This is a test data",
                lang: "EN",
                data: "BASE64_DATA"
            }
        });
        expect(response.status).to.equal(401);
    });
});

describe("DELETE - Admin delete a data", () => {
    const auth = {token: ""};
    before(loginUser(auth, {email: "admin@test.com", password: "ThisIsAPassword"}))
    it("Create a data in a subcategory", async () => {
        const response = await supertest(app).delete("/api/admin/data/rem").send({
            category: "testCI",
            subcategory: "one",
            name: "Second Data"
        }).set("Authorization", "bearer " + auth.token);
        expect(response.status).to.equal(200);
    });
    it("Data does not exist", async () => {
        const response = await supertest(app).delete("/api/admin/data/rem").send({
            category: "testCI",
            subcategory: "one",
            name: "Second Data"
        }).set("Authorization", "bearer " + auth.token);
        expect(response.status).to.equal(400);
    });
    it("Unauthorized", async () => {
        const response = await supertest(app).delete("/api/admin/data/rem").send({
            category: "testCI",
            subcategory: "one",
            name: "Second Data"
        });
        expect(response.status).to.equal(401);
    });
});