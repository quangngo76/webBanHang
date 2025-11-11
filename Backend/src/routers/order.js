const express = require('express')
const router = express.Router()

const OrderController = require('../controllers/OrderController')

router.get('/getOrderAll', OrderController.getOrderAll);
router.get('/getOrderOfUser', OrderController.getOrderOfUser);
router.post('/addOrder', OrderController.addOrder);
router.post('/updateStatus', OrderController.updateStatus);
router.post('/getOrderId', OrderController.getOrderId);
router.post('/deleteOrderId', OrderController.deleteOrderId);

module.exports = router