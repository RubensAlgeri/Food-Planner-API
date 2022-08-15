import joi from "joi";

export const signupUserSchema = joi.object({
    email: joi.string().email({ tlds: { allow: false } }).required(),
    password: joi.string().min(6).required(),
    name: joi.string().min(3).max(20).required(),
    image: joi.string().uri().required()
});

export const signinUserSchema = joi.object({
    email: joi.string().email({ tlds: { allow: false } }).required(),
    password: joi.string().min(6).required(),
});