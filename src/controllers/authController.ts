import { Request, Response } from "express";
import * as authService from '../services/authService.js';

export async function signIn(req:Request, res:Response) {
    const {email, password} = req.body;
    const data={email,password}
    const body = await authService.login(data);
    res.send(body)
}

export async function signUp(req:Request, res:Response) {
    const {email, password, name, image} = req.body;
    const data={email,password, name, image}
    await authService.checkEmail(email);
    await authService.createUser(data);
    res.sendStatus(201)
}