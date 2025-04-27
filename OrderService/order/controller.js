const OrderModel = require("./model");
class OrderController {
  async createOrder(req, res) {
    try {
      const { userId, totalAmount, items } = req.body;
      const order = await OrderModel.createOrder({
        userId,
        totalAmount,
        items,
      });
      return res.status(201).json(order);
    } catch (error) {
      console.log(error);
    }
  }

  async getOrder(req, res) {
    try {
      const { userId } = req.params;
      const order = await OrderModel.getOrder(userId);
      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
    }
  }

  async updateOrder(req, res) {
    try {
      const { orderId, status } = req.body;
      const order = await OrderModel.updateOrder({ orderId, status });
      if (!order) return res.status(404).json({ msg: "order not found" });
      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new OrderController();
