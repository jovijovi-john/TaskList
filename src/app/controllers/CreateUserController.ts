import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';

export class CreateUserController {
    async handle(req: Request, res: Response) {
        let { name, email, password_hash } = req.body;

        let userExists = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (!userExists) {

            password_hash = password_hash.trim();

            if (password_hash.length < 6) {
                return res.status(400).json({
                    err: "Informe uma senha com pelo menos 6 digitos"
                })
            }

            const user = await prismaClient.user.create({
                data: {
                    name,
                    email,
                    password_hash
                }
            })

            return res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at
            });
        }
        else {
            return res.status(401).json({err: "O usuário já existe"})
        }
    }
}
