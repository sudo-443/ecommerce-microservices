require("dotenv").config();
const user = require("./payment/router");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Consul = require("consul")
const consul = new Consul()
app.use(express.json());
app.use("/", user);
const port = process.env.PORT;
const uri = process.env.mongo_uri;

consul.agent.service.register({
  name: 'payment-service',  
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
