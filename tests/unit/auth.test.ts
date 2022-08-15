import * as authService from "../../src/services/authService.js"
import * as authRepository from "../../src/repositories/authRepository.js";
import * as scenarioFactory from "../factories/scenarioFactory.js"
import * as authFactory from "../factories/authFactory.js"
import jwt from "jsonwebtoken"


import { jest } from "@jest/globals"

beforeEach(async () => {
    await scenarioFactory.deleteAllData();
});

describe("POST authService test suite", () => {

    it("register an user it should call createUser function", async () => {

        const body = await authFactory.generateUser();

        jest.spyOn(authRepository, "createUser").mockImplementation((): any => { return null })

        await authService.createUser(body)

        expect(authRepository.createUser).toHaveBeenCalledTimes(1)
    })

    it("check user email it should call checkEmail function", async () => {

        const body = await authFactory.generateUser();

        jest.spyOn(authRepository, "checkEmail").mockImplementationOnce((): any => { return null })

        await authService.checkEmail(body.email)

        expect(authRepository.checkEmail).toHaveBeenCalledTimes(1)
    })

    it("check user email already used it should throw conflict error", async () => {

        const body = await authFactory.generateUser();

        jest.spyOn(authRepository, "checkEmail").mockImplementationOnce((): any => { return body.email })

        const response = authService.checkEmail(body.email)

        const error = {
            message: "Email is already used",
            type: 409
        }

        expect(response).rejects.toEqual(error)
    })

    it("check login function it should call checkEmail function", async () => {

        const body = await authFactory.generateUser();

        jest.spyOn(authRepository, "checkEmail").mockImplementationOnce((): any => { return body })
        delete body.name;
        delete body.image;
        const data = await authService.login(body)
        const token = jwt.sign(body.email, process.env.JWT_SECRET);

        expect(data).toMatchObject({token,image:body.image,id:1})
    })

    it("check login function it should throw not found error", async () => {

        const body = await authFactory.generateUser();

        jest.spyOn(authRepository, "checkEmail").mockImplementationOnce((): any => { return null })
        delete body.name;
        delete body.image;
        const response = authService.login(body)

        const error = {
            message: "Email is not found",
            type: 404
        }

        expect(response).rejects.toEqual(error)
    })

    it("check login function it should throw unauthorized error", async () => {

        const body = await authFactory.generateUser();

        jest.spyOn(authRepository, "checkEmail").mockImplementationOnce((): any => { return body })

        body.password="000000"
        delete body.name;
        delete body.image;
        const response = authService.login(body)

        const error = {
            message: "Email is not found",
            type: 401
        }

        expect(response).rejects.toEqual(error)
    })
});