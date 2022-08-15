import app from '../../src/app.js';
import { faker } from "@faker-js/faker";
import supertest from 'supertest';

export async function generateUser(){
    const user = {
        name: faker.random.word(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        image: faker.image.food(),
    }
    return user;
}

export async function singInUser(){
    const body ={
        name: faker.random.word(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
        image: faker.image.food(),
    }
    await supertest(app).post("/signup").send(body);
    delete body.image;
    delete body.name;
    const response = await supertest(app).post("/signin").send(body);

    return response.text;
}