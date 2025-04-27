const Order = require("./schema")
class OrderModel{
    async createOrder({userId,totalAmount,items}){
        try{
            const order = new Order({userId,totalAmount,items})
            await order.save()
            return order
        }
        catch(error){
            console.log(error)
        }
    }

    async getOrder(userId){
        try{
            return await Order.find({userId})
        }
        catch(error){
            console.log(error)
        }
    }

    async updateOrder({orderId,status}){
        try{
            return await Order.findByIdAndUpdate({_id:orderId},{status:status},{new:true})
        }
        catch(error){
            console.log(error)
        }
    }

}

module.exports = new OrderModel()