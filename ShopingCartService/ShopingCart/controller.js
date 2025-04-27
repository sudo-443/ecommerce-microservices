const ShopingCartModel = require("./model");

class ShopingCart {
  async addToCart(req, res) {
    try {
      const { userId,items:[{productId,quantity}]} = req.body;
      let cart = await ShopingCartModel.getCart(userId);
      if (!cart) {
		    cart = await ShopingCartModel.createCart(userId,productId, quantity);
      } else {
        const itemsIndex = cart.items.findIndex((items) =>
          productId === items.productId
        );

        if (itemsIndex > -1) {
          cart.items[itemsIndex].quantity += quantity;
        } else {
          cart.items.push({ productId, quantity });
        }
        await ShopingCartModel.saveCart(cart)
      }
      return res.json(cart);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getCart(req,res){
	try{
    const {id}=req.params
		return res.json({cart: await ShopingCartModel.getCart(id)})
	}
	catch(error){
		console.log(error);
	}
  }

  async deleteCart(req,res){
    try{
      const {userId,productId}=req.params
      const cart = await ShopingCartModel.getCart(userId)

      if(!cart) return res.status(404).json({"msg":"cart not found"})
      cart.items = cart.items.filter((item)=>item.productId != productId)
      await ShopingCartModel.saveCart(cart)

      return res.json({"message":"cart removed"})
    }
    catch(error){
      console.log(error);
    }
  }
}

module.exports = new ShopingCart();
