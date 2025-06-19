import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, getProducts, getProductsByid } from "./handlers/products"
import { handleImputErrors } from "./middleware"

const router = Router()

// Routing
router.get('/', getProducts)



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


router.put('/', (req, res) => {
    res.json('Desde PUT')
})

router.patch('/', (req, res) => {
    res.json('Desde PATCH')
})

router.delete('/', (req, res) => {
    res.json('Desde DELETE')
})


export default router



