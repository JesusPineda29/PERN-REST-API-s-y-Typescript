import reques from "supertest";
import server from "../../server";


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


describe('GET /api/products/:id', () => {
    it('Should return a 404 response for a non-existent product', async () => {

        const productId = 2000; // Assuming this ID does not exist
        const response = await reques(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');
    })

    it('should check a valid ID in the URL', async () => {
        const response = await reques(server).get('/api/products/not-valid-url')
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('ID no valido');
    })

    it('get a JSON response for a single product', async () => {
        const response = await reques(server).get('/api/products/1')
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    })
})


describe('PUT /api/products/:id', () => {

    it('should check a valid ID in the URL', async () => {
        const response = await reques(server).put('/api/products/not-valid-url')
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 300,
            })
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('ID no valido');
    })


    it('should display validation error messages when updating a product', async () => {
        const response = await reques(server).put('/api/products/1').send({})
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data')
    })


    it('should validate that the price is greater than 0', async () => {
        const response = await reques(server).put('/api/products/1')
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 0
            })
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Precio no válido');

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data')
    })

    it('should vreturn a 404 response for a non-existent product', async () => {
        const productId = 2000; // Assuming this ID does not exist
        const response = await reques(server).put(`/api/products/${productId}`)
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 300
            })
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado');


        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data')
    })


    it('should update an existing product with valid data', async () => {
        const response = await reques(server).put(`/api/products/1`)
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 300
            })
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');


        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors')
    })
})



describe('PATCH /api/products/:id', () => {

    it('should check a valid ID in the URL', async () => {
        const response = await reques(server).patch('/api/products/not-valid-url')
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 300,
            })
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('ID no valido');
    })

    it('should update an existing product with valid data', async () => {
        const response = await reques(server).patch('/api/products/1')
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 300,
            })
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors')
    })

    it('should return a 404 response for a non-existent product', async () => {
        const productId = 2000; // Assuming this ID does not exist
        const response = await reques(server).patch(`/api/products/${productId}`)
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 300
            })
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado');
    })
})



describe('DELETE /api/products/:id', () => {

    it('should check a valid ID in the URL', async () => {
        const response = await reques(server).delete('/api/products/not-valid-url')
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('ID no valido');
    })

    it('should return a 404 response for a non-existent product', async () => {
        const productId = 2000; // Assuming this ID does not exist
        const response = await reques(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado');
    })

    it('should delete an existing product', async () => {
        const response = await reques(server).delete('/api/products/1')
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    })
})