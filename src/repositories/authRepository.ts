import prisma from "../database.js";
import { CreateUserData } from "../types/user.js";

export function checkEmail(email:string) {
    return prisma.user.findUnique({where:{email}})
}

export function createUser(data:CreateUserData) {
    return prisma.user.create({data})
}

export function checkToken(id:number) {
    return prisma.user.findUnique({where:{id}})
}