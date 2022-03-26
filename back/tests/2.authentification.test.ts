/* ----- Imports ----- */

import supertest from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";

import app from "../src/index";

import { User } from "../src/models/User.model";

/* ----- Code ----- */

describe("POST - Register", () => {
    before(async () => {
        await User.deleteMany({});
    })
    it("User succesfully registred", async () => {
        const response = await supertest(app).post("/api/user/register").send({
            email: "test@test.com",
            password: "ThisIsAPassword",
        });
        expect(response.status).to.equal(201);
    });
});

describe("POST - Login User", () => {
    it("User succesfully logged in", async () => {
        const response = await supertest(app).post("/api/user/login").send({
            email: "test@test.com",
            password: "ThisIsAPassword",
        });
        expect(response.status).to.equal(200);
    });
    it("User log in wrong password", async () => {
        const response = await supertest(app).post("/api/user/login").send({
            email: "test@test.com",
            password: "ThisIsAWrongPassword",
        });
        expect(response.status).to.equal(400);
    });
});

describe("POST - Login Admin", () => {
    before(async () => {
        const user = new User({email: "admin@test.com", password: "ThisIsAPassword", admin: true});
        await user.save();
    });
    it("Admin succesfully logged in", async () => {
        const response = await supertest(app).post("/api/user/login").send({
            email: "admin@test.com",
            password: "ThisIsAPassword",
        });
        expect(response.status).to.equal(200);
    });
    it("Admin log in wrong password", async () => {
        const response = await supertest(app).post("/api/user/login").send({
            email: "admin@test.com",
            password: "ThisIsAWrongPassword",
        });
        expect(response.status).to.equal(400);
    });
});