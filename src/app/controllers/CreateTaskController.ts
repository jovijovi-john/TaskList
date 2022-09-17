import { Request, Response } from "express";
import prismaClient from "../database/prismaClient";

export class CreateTaskController {
    async handle(req: Request, res: Response) {

        const { check, task } = req.body;

        const user = await prismaClient.user.findFirst({
            where: {
                id: req.userId
            }
        });

        if (!user) {
            res.status(400).json({
                err: "Usuário não identificado"
            })
        } else {
            try {

                const taskCreate = await prismaClient.task.create({
                    data: {
                        check: check,
                        id_user: user.id,
                        task
                    }
                })

                return res.json(taskCreate)

            } catch (err) {
                return res.status(400).json({
                    err: "Erro ao cadastrar task"
                })
            }
        }
    }
}
