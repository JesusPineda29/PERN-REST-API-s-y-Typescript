import request from "supertest";
import server from "../server";

describe('GET / api', () => {
    it('should send back a json responde', async () => {
        const res = await request(server).get('/api')

        // lo que se debe de cumplir
        expect(res.statusCode).toEqual(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')
        // console.log(res.body.msg)


        // lo que no se debe de cumplir
        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})




