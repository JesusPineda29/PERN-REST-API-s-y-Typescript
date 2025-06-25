import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProducts, getProductsByid, updateAvailability, updateProduct } from "./handlers/products"
import { handleImputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The Product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The Product name
 *           example: "Monitor Curvo de 49 Pulgadas"
 *         price:
 *           type: number
 *           description: The Product price
 *           example: 199.99
 *         availability:
 *           type: boolean
 *           description: The Product availability
 *           example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response        
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */



// Routing
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *     get: 
 *        summary: Get a product by ID
 *        tags:
 *             - Products
 *        description: Return a product based on its unique ID
 *        parameters:
 *           - in: path
 *             name: id
 *             description: The ID of the product to retrieve
 *             required: true
 *             schema:
 *                 type: integer
 *        responses:
 *            200:
 *               description: Successful response
 *               content:
 *                   application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'    
 * 
 *            404:
 *               description: Not found
 *            400:
 *               description: Bad request, invalid ID
 * 
 
 
 * 
 * 
 */






router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleImputErrors,
    getProductsByid)



router.post('/',
    // validación
    body('name')
        .notEmpty().withMessage('El nombre de producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El nombre de producto no puede ir vacio')
        .custom(value => value > 0.).withMessage('Precio no válido'),
    handleImputErrors,
    createProduct)



router.put('/:id',
    // validación
    param('id').isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El nombre de producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El nombre de producto no puede ir vacio')
        .custom(value => value > 0.).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleImputErrors,
    updateProduct
)


router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleImputErrors,
    updateAvailability
)





router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleImputErrors,
    deleteProduct
)


export default router



