import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prismaClient from "../database/prismaClient";

import authConfig from "../../config/auth";

import { Request, Response } from "express";

export class SessionController {
    async handle(req: Request, res: Response) {
        const { email: email_user, password_hash } = req.body;

        // verificando se o usuário existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email_user
            }
        })

        if (!user) {
            return res.status(401).json({
                error: "Usuário não existe"
            })
        }

        if (! (await bcrypt.compare(password_hash, user.password_hash) )) {
            return res.status(401).json({
                error: "Senha incorreta"
            })
        }

        const { id, name, email } = user;

        return res.json({
            user: {
                id,
                name,
                email
            },

            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        })
    }
}
