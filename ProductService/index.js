require("dotenv").config();
const product = require("./Product/router");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Consul = require("consul")
const consul = new Consul()
app.use(express.json());
app.use("/", product);
const port = process.env.PRODUCT_PORT;
const uri = process.env.mongo_Product_Uri;

consul.agent.service.register({
  name: 'product-service',  
  address: 'localhost',  
  port: parseInt(port),
  check: {
    http: `http://localhost:${port}/health`,
    interval: '10s',
  }
}, err => {
  if (err) throw err;
  console.log('User Service registered with Consul');
});
app.get('/health', (req, res) => res.send('OK'));

(async () =>
  await mongoose
    .connect(uri)
    .then(() => console.log("mongodb connected mongo uri", uri)))();

app.listen(port, () => console.log("server is running on port", port));
