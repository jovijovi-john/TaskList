import { Request, Response } from "express";
import prismaClient from "../database/prismaClient";

export class GetAllTasksController {
    async handle(req: Request, res: Response) {
        const tasks = await prismaClient.task.findMany({
            where: {
                check: true
            }
        })


        return res.status(200).json(tasks);
    }
}
