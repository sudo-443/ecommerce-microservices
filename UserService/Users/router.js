const express = require("express");
const route = express.Router();
const userController = require("./controller");
const UserModel = require("./model")

route.post("/register", userController.Register);
route.post("/login", userController.Login);

//test 
route.get("/",UserModel.listUser)
module.exports = route;
