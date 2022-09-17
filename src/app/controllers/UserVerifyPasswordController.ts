import { Response } from "express";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";


export class UserVerifyPasswordController {
    async handle(password_hash: string, user_password: string, feedback_error?: string) {
        return (!(await bcrypt.compare(password_hash, user_password))) ? false : true;
    }
}
