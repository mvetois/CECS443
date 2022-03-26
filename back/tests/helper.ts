/* ----- Imports ----- */

import supertest from "supertest";

import app from "../src/index";

/* ----- Code ----- */

export const loginUser = (auth, userData) =>{
    return (done) => {
        supertest(app).post("/api/user/login").send({
                email: userData.email,
                password: userData.password
            }).expect(200).end((err, res) => {auth.token = res.body.token; done();});
    };
}