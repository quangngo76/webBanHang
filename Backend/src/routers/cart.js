const express = require('express')
const router = express.Router()

const CartController = require('../controllers/CartController')

router.post('/', CartController.addProduct)
router.get('/', CartController.getProduct)
router.post('/deleteProduct', CartController.deleteProduct)

module.exports = router