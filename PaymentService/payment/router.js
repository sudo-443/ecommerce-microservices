const express = require("express")
const router = express.Router()
const PaymrntController =require("./controller")
router.post("/pay",PaymrntController.Pay)
module.exports = router