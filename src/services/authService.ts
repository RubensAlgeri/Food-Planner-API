import * as authRepository from "../repositories/authRepository.js";
import { CreateLoginUserData, CreateUserData } from "../types/user.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();


export async function checkEmail(email:string) {
    const check = await authRepository.checkEmail(email)
    if(check)throw{type:409,message:"Email is already used"}
}

export async function createUser(userData:CreateUserData) {
    userData.password = bcrypt.hashSync(userData.password, +process.env.HASH);
    await authRepository.createUser(userData);
}

export async function login(userData: CreateLoginUserData) {
    const user = await authRepository.checkEmail(userData.email)
    if(!user)throw{type:404,message:"Email is not found"}

    if (!bcrypt.compareSync(userData.password, user.password)) throw{type:401,message:"Check your email/password"}
    const token = jwt.sign(userData.email, process.env.JWT_SECRET);
    const data = {token, image:user.image, id:user.id}
    return data;
}