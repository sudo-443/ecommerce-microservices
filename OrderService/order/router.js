const express = require("express")
const router = express.Router()
const OrderController = require("./controller")

router.post("/order",OrderController.createOrder)
router.get("/order/:userId",OrderController.getOrder)
router.patch("/order",OrderController.updateOrder)

module.exports = router