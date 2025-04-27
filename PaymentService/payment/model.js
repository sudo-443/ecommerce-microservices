const Payment  = require("./schema")
class PaymentModel {
  async Pay({ orderId, totalAmount }) {
    try {
        const payment = new Payment({orderId,totalAmount})
        await payment.save()
        return payment
    } catch (error) {
        console.log(error)
    }
  }
}

module.exports = new PaymentModel();
