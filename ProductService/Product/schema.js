const mongoose = require("mongoose");

const product = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
});

const Product = mongoose.model("Product", product);

module.exports = Product;
