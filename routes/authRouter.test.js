import mongoose from "mongoose";
import app from "../app.js";
import request from "supertest";


const { TEST_DB_HOST } = process.env;

describe("test /api/users/login", () => {
    let server = null;
    let db = null;
    beforeAll(() => {
        db = mongoose.createConnection(TEST_DB_HOST);
        server = app.listen(3000);
    })

    afterAll(async () => {
        await db.close();
        await server.close();
    })

    test("test with correct credentials", async () => {
        const loginData = {
            email: "maryana@gmail.com",
            password: "3456qwe"
        };

        const { statusCode, body } = await request(app).post("/api/users/login").send(loginData);
        expect(statusCode).toBe(200);
        expect(body.token).not.toBe("");
        expect(body.user.email).toBe(loginData.email)
        expect(body.user.subscription).toMatch(/starter|pro|business/)


    })
})