const Product = require("./schema");
console.log(" schema", Product);
class UserModel {
  async InsertProduct(data) {
    try {
      console.log("before db");
      const product = new Product(data);
      await product.save();
      console.log("after db", product);
      return product;
    } catch (error) {
      console.log(error.message);
    }
  }

  async ListProduct() {
    try {
      return await Product.find();
    } catch (error) {
      console.log(error);
    }
  }

  async GetProduct(id) {
    try {
      return await Product.find({ _id: id }).lean();
    } catch (error) {
      console.log(error);
    }
  }

  async UpdateProduct(data, id) {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
      ).lean();
      return product;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserModel();
 