/* ----- Imports ----- */

import JWT, { SignOptions, Secret } from "jsonwebtoken";

/* ----- Code ----- */

export const signAccessToken = (userID : string) : Promise<any> => {
    return (new Promise((resolve, reject) => {
        const payload : object = {};
        const secret : Secret= "secret";
        const options : SignOptions = {
            audience: userID
        };
        JWT.sign(payload, secret, options, (err: Error, token: string) => {
            if (err) { reject(err) };
            resolve(token);
        });
    }));
}