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
    if (!req.headers["authorization"]) {
        return(next(res.status(401).send({error: "Access token is required"})));
    }
    const barer =  req.headers['authorization'].split(' ');
    const token = barer[1];
    JWT.verify(token, secret, (err, payload) => {
        if (err) {
            return (next(res.status(401).send({error: "Invalid access token"})));
        }
        req.payload = payload;
        next()
    });
}

export const verifyAccessTokenAdmin = (req, res, next) => {
    if (!req.headers["authorization"]) {
        return(next(res.status(401).send({error: "Access token is required"})));
    }
    const barer =  req.headers['authorization'].split(' ');
    const token = barer[1];
    JWT.verify(token, secret, (err, payload) => {
        if (err || !payload.admin) {
            return (next(res.status(401).send({error: "Invalid access token"})));
        }
        req.payload = payload;
        next()
    });
}
