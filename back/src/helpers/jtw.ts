/* ----- Imports ----- */

import JWT, { SignOptions, Secret } from "jsonwebtoken";
import { nextTick } from "process";

/* ----- Code ----- */

const secret : Secret= "secret";

export const signAccessToken = (userID : string, admin : boolean) : Promise<any> => {
    return (new Promise((resolve, reject) => {
        const payload : object = {
            admin: admin,
            userID: userID
        };
        const options : SignOptions = {
            audience: admin + "//" + userID,
        };
        JWT.sign(payload, secret, options, (err: Error, token: string) => {
            if (err) { reject(err) };
            resolve(token);
        });
    }));
}

export const verifyAccessToken = (req, res, next) => {
    let token = null;
    //Token provided in headers
    if(req.headers["authorization"]) token = req.headers["authorization"].split(' ')[1];
    //Token provided in cookies
    else if (req.cookies["accessToken"]) token = req.cookies["accessToken"];
    //No access token provided
    else return(next(res.status(401).send({error: "Access token is required"})));
    
    JWT.verify(token, secret, (err, payload) => {
        if (err) {
            return (next(res.status(401).send({error: "Invalid access token"})));
        }
        req.payload = payload;
        next()
    });
}

export const verifyAccessTokenAdmin = (req, res, next) => {
    let token = null;
    //Token provided in headers
    if(req.headers["authorization"]) token = req.headers["authorization"].split(' ')[1];
    //Token provided in cookies
    else if (req.cookies["accessToken"]) token = req.cookies["accessToken"];
    //No access token provided
    else return(next(res.status(401).send({error: "Access token is required"})));
    
    JWT.verify(token, secret, (err, payload) => {
        if (err || !payload.admin) {
            return (next(res.status(401).send({error: "Invalid access token"})));
        }
        req.payload = payload;
        next()
    });
}
