import { Request, Response } from "express";
import prismaClient from "../database/prismaClient";

export class FindAllTasksController {
    async handle(req: Request, res: Response) {
        const tasks = await prismaClient.task.findMany({
            where: {
                id_user: req.userId,
                check: true
            }
        })


        return res.status(200).json(tasks);
    }
}
