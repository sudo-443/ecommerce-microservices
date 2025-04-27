const express = require("express");
const route = express.Router();
const ProductController = require("./controller");

route.post("/products", ProductController.CreateProducts);
route.get("/products", ProductController.GetProducts);
route.get("/products/:id", ProductController.GetProductById);
route.patch("/products/:id", ProductController.UpdateProduct);

module.exports = route;
