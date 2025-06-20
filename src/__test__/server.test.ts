import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";


describe('GET / api', () => {
    it('should send back a json responde', async () => {
        const res = await request(server).get('/api')

        // lo que se debe de cumplir
        expect(res.statusCode).toEqual(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')


        // lo que no se debe de cumplir
        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})


jest.mock('../config/db');


describe('connectDB', () => {
    it('should hanldle database connection error', async () => {

        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'))

        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Hubo un error al conectar a la BD'))
    })
})

