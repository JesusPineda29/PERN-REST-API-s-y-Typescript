import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProducts, getProductsByid, updateAvailability, updateProduct } from "./handlers/products"
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



