const mongoose = require("mongoose")
const PaymentSchema = mongoose.Schema({
    orderId : String,
    totalAmount : Number,
    status:{
        type: String,
        enum: ["success","fail"],
        default:"success"
    }
})
const Payment = mongoose.model("Payment",PaymentSchema)
module.exports = Payment