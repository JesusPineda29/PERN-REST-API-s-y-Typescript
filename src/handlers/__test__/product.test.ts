import reques from "supertest";
import server from "../../server";
import { response } from 'express';

describe('POST /api/products', () => {


    it('should display validation errors', async () => {
        const response = await reques(server).post('/api/products').send({})
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4);


        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    })


    it('should display validate that the price is great than 0', async () => {

        const response = await reques(server).post('/api/products').send({
            name: "Monitor curvo",
            price: 0
        })
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1);


        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    })


    it('shold ceeate a new product', async () => {
        const response = await reques(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 10
        })

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
    })
})


describe('GET /api/products', () => {

    it('should check if api/products exists', async () => {
        const response = await reques(server).get('/api/products')
        expect(response.status).not.toBe(404);
    })

    it('GET a JSON response with products', async () => {
        const response = await reques(server).get('/api/products')
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);


        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('errors');
    })
})