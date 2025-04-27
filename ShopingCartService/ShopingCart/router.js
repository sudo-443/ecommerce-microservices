const express = require("express")
const router = express.Router()
const shopingCartController = require("./controller")

router.post("/add",shopingCartController.addToCart)
router.get("/get/:id",shopingCartController.getCart)
router.delete("/:userId/:productId",shopingCartController.deleteCart)

module.exports = router