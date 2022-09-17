import { Request, Response } from "express";
import prismaClient from "../database/prismaClient";

export class DeleteTaskController {
    async handle(req: Request, res: Response) {

        let { id } = req.params;

        let task_ = await prismaClient.task.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!task_) {
            return res.status(400).json({
                err: "Essa task não existe"
            })
        }

        let idUserReq = <unknown> req.userId as number;

        // se ele nao for o dono da task
        if (task_.id_user != idUserReq) {
            return res.status(401).json({
                err: "Você não pode deletar tasks que não são suas"
            })
        }

        try {
            const taskDeleted = await prismaClient.task.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return res.status(200).json(taskDeleted);
        }

        catch (err) {
            return res.status(400).json({
                err: "Erro ao deletar tasklist"
            })
        }


    }
}
