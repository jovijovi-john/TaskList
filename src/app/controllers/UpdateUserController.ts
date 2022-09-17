import { Request, Response } from "express";
import prismaClient from "../database/prismaClient";
import { UserVerifyPasswordController } from "./UserVerifyPasswordController";

export class UpdateUserController {
    async handle(req: Request, res: Response) {

        let { name, email, old_password, password_hash } = req.body;

        if (password_hash) password_hash = password_hash.trim();

        let user = await prismaClient.user.findFirst({
            where: {
                id: req.userId
            }
        })

        console.log("o usuario é " + user)

        if (!user) {
            return res.status(401).json({
                err: "Efetue login para concluir esta operação"
            })
        }

        if (!name) {
            // se ele nao quiser alterar o nome, carrega o nome que ja tava la
            name = user.name;
            }

        if (email) {
            if (email !== user.email) {
                const emailAlreadyRegistered = await prismaClient.user.findUnique({
                    where: {
                        email
                    }
                })

                if (emailAlreadyRegistered) {
                    // se o email ja está cadastrado no banco, e o email é dele, nao tem porque mostrar erro. Ele so repetiu o email dele
                    if (emailAlreadyRegistered.email !== user.email) {
                        return res.status(400).json({
                            err: "Já existe um usuário cadastrado com esse email"
                        })
                    }
                }
            }
        } else {
            email = user.email;
        }

        // aqui ele quer trocar de senha

        if (old_password) {
            const verifyPassword = new UserVerifyPasswordController;
            const result = await verifyPassword.handle(old_password, user.password_hash);

            if (!result) {
                return res.status(403).json({
                    err: "Senha incorreta"
                })
            }

            if (password_hash) {
                if (password_hash.length < 6) {
                    return res.status(400).json({
                        err: "Informe uma senha nova com pelo menos 6 digitos"
                    })
                }
            }

        }

        try {

            let userUpdated;

            if (old_password && password_hash) {
                userUpdated = await prismaClient.user.update({
                    data: {
                        email,
                        password_hash,
                        name
                    },
                    where: {
                        id: user.id
                    }
                })
            }

            return res.status(200).json(userUpdated)

        } catch (err) {
            console.log(err)
            return res.status(400).json({
                err: "Erro ao atualizar usuário"
            })
        }
    }
}
