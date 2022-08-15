import * as foodRepository from "../repositories/foodRepository.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export async function deleteDatabase(){
    await foodRepository.resetDatabase();
}