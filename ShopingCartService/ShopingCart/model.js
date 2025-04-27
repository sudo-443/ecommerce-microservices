const Cart = require("./config")

class ShopingCart {
  async getCart(userId) {
    try {
        return await Cart.findOne({userId:userId})
    } catch (error) {
      console.log(error);
    }
  }
  
  async createCart(userId,productId,quantity){
    try {
        const cart = await new Cart({userId,items:[{productId,quantity}]})
        cart.save()
        return cart
    } catch (error) {
        console.log(error);
    }
  }

  async saveCart(cart){
    try {
      await Cart.updateOne({userId:cart.userId},{items:cart.items})
    } catch (error) {
      console.log(error)
    }
  }


}

module.exports = new ShopingCart();
