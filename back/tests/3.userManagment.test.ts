/* ----- Imports ----- */

import supertest from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";

import app from "../src/index";
import { loginUser } from "./helper";

/* ----- Code ----- */

describe("POST - User change password", () => {
    var auth = {token: ""};
    before(loginUser(auth, {email: "test@test.com", password: "ThisIsAPassword"}));
    it("User succesfully changed password", async () => {
        const response = await supertest(app).post("/api/user/updatepassword").send({
            email: "test@test.com",
            password: "ThisIsAPassword",
            newpassword: "ThisIsANewPassword"
        }).set("Authorization", "bearer " + auth.token);
        expect(response.status).to.equal(200);
    });
    it("User error change password", async () => {
        const response = await supertest(app).post("/api/user/updatepassword").send({
            email: "test@test.com",
            password: "ThisIsAWrongPassword",
            newpassword: "ThisIsAWrongNewPassword"
        }).set("Authorization", "bearer " + auth.token);
        expect(response.status).to.equal(400);
    });
    it("User error auth change password", async () => {
        const response = await supertest(app).post("/api/user/updatepassword").send({
            email: "test@test.com",
            password: "ThisIsANewPassword",
            newpassword: "ThisIsAWrongNewPassword"
        });
        expect(response.status).to.equal(401);
    });
});