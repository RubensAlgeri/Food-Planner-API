import app from '../../src/app.js';
import supertest from 'supertest';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authFactory from '../factories/authFactory.js';
import * as scenarioFactory from "../factories/scenarioFactory.js"
import prisma from '../../src/database.js';
import dotenv from 'dotenv';
dotenv.config();

beforeEach(async () => {
    await scenarioFactory.deleteAllData();
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe("Auth router tests", () => {

    it("creating a user it should return 201", async () => {
        const body = await authFactory.generateUser();
        await supertest(app).post("/signup").send(body);

        const user = await prisma.user.findUnique({where:{email:body.email}})

        expect(bcrypt.compareSync(body.password, user.password)).toEqual(true);
    });

    it("creating a user with an used email it should return 409", async () => {
        const body = await authFactory.generateUser();
        await supertest(app).post("/signup").send(body);
        await supertest(app).post("/signup").send(body);

        const user = await prisma.user.findMany({where:{email:body.email}})

        expect(user.length).toEqual(1);
    });

    it("creating a user without an email it should return 422", async () => {
        const body = await authFactory.generateUser();
        delete body.email;
        await supertest(app).post("/signup").send(body);
        const user = await prisma.user.findMany({where:{email:body.email}})

        expect(user.length).toEqual(0);
    });

    it("creating a user without an password it should return 422", async () => {
        const body = await authFactory.generateUser();
        delete body.password;
        await supertest(app).post("/signup").send(body);
        await supertest(app).post("/signup").send(body);
        const user = await prisma.user.findMany({where:{email:body.email}})

        expect(user.length).toEqual(0);
    });

    it("make login with a registered a user it should return a token", async () => {
        const body = await authFactory.generateUser();
        await supertest(app).post("/signup").send(body);
        delete body.name;
        delete body.image;
        const token = jwt.sign(body.email, process.env.JWT_SECRET);
        const response = await supertest(app).post("/signin").send(body);

        expect(response.text).toContain(token);
    });

    it("make login with a wrong password it should return a 401", async () => {
        const body = await authFactory.generateUser();
        await supertest(app).post("/signup").send(body);

        delete body.name;
        delete body.image;
        const body2 = await authFactory.generateUser();
        body.password=body2.password;

        const token = jwt.sign(body.email, process.env.JWT_SECRET);
        const response = await supertest(app).post("/signin").send(body);

        expect(response.text).not.toBe(token);
    });

    it("make login with a unregistered email it should return a 404", async () => {
        const body = await authFactory.generateUser();
        delete body.name;
        delete body.image;
        const token = jwt.sign(body.email, process.env.JWT_SECRET);
        const response = await supertest(app).post("/signin").send(body);

        expect(response.text).not.toBe(token);
    });
});