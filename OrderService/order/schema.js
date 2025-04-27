const mongoose = require("mongoose")

const OrderSchema  = mongoose.Schema({
    userId:String,
    items:[{
        productId:String,
        quantity:Number
    }],
    totalAmount:Number,
    status:{
        type:String,
        enum:["pending","paid","failed"],
        default:"pending"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Order = mongoose.model("order",OrderSchema)
module.exports = Order
