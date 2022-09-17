import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

export default async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // se nao tiver token
    if (!authHeader) {
        return res.status(401).json({
            error: "Token não informado"
        })
    }

    // authHeader == "Bearer eyJhbGciOiIkpXVCJ9.eyJpZCI6MzYsIm6MTY2MzMQxNDUwfQ.iG-2uHwxUuf-dWPd-AvhOJJ7sOw"
    const [, token] = authHeader.split(" ");

    try {
        // o decoded vai receber o payload que escolhemos, que no caso é o id
        const decoded = jwt.verify(token, authConfig.secret, (err, dec: any) => {

            req.userId = dec?.id;

            return next();
        }) as any;


    }
    catch (error) {
        console.log(error)
    }

}
