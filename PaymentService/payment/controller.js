const PaymentModel = require("./model");
const axios = require("axios");

class PaymentController {
  async Pay(req, res) {
    try {
      const { orderId, totalAmount } = req.body;
      const payment = await PaymentModel.Pay({ orderId, totalAmount });

      try {
          await axios.patch(`http://localhost:5004/order/`, {
          orderId,
          status: payment.status === "success" ? "paid" : "failed",
        });
        res.status(201).json(payment);
      } catch (error) {
        console.log("faild to update status",error);
      }
    } catch (error) {
      console.log(error); 
    }
  }
}

module.exports = new PaymentController();
