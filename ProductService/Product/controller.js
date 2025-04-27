const ProductModel = require("./model");

class UserController {
  async CreateProducts(req, res) {
    try {
      const { name, description, price, stock } = req.body;
      const product = await ProductModel.InsertProduct({
        name,
        description,
        price,
        stock,
      });
      return res.status(201).json(product);
    } catch (error) {
      console.log(error.message);
    }
  }
  async GetProducts(req, res) {
    try {
      const product = await ProductModel.ListProduct();
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  }

  async GetProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.GetProduct(id);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  }


  async UpdateProduct(req, res) {
    try {
      const data= req.body;
      const id = req.params.id;
      const product = await ProductModel.UpdateProduct(data,id);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new UserController();
