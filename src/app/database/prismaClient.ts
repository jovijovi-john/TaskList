import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prismaClient = new PrismaClient();

type User = {
    name: string;
    password_hash: string;
    email: string;
}

prismaClient.$use(async (params, next) => {

    const data = params.args.data as User;

    if (data && params.model !== "Task") {
        // criptografando a senha
        data.password_hash = await bcrypt.hash(data.password_hash, 8);
    }

    const result = await next(params);

    return result
})

export default prismaClient;
