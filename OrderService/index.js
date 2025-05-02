require("dotenv").config();
const Order = require("./order/router");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Consul = require('consul');
const consul = new Consul();

app.use(express.json());
app.use("/", Order);
const port = process.env.PORT;
const uri = process.env.mongo_uri;

// consul.agent.service.register({
//   name: 'order-service',  
//   address: 'localhost',  
//   port: parseInt(port),
//   check: {
//     http: `http://localhost:${port}/health`,
//     interval: '10s',
//   }
// }, err => {
//   if (err) throw err;
//   console.log('User Service registered with Consul');
// });


if (process.env.ENABLE_CONSUL === 'true') {
  const consul = require('consul')({ host: '127.0.0.1', port: 8500 });

  consul.agent.service.register({
    name: 'order-service',
    address: 'localhost',
    port: parseInt(process.env.PORT || 5004),
    check: {
      http: `http://localhost:${process.env.PORT || 5004}/health`,
      interval: '10s'
    }
  }, err => {
    if (err) {
      console.error('❌ Consul registration failed:', err.message);
    } else {
      console.log('✅ Consul: Service registered');
    }
  });
} else {
  console.log('⏭ Skipping Consul registration (ENABLE_CONSUL != true)');
}

app.get('/health', (req, res) => res.send('OK'));

(async () =>
  await mongoose
    .connect(uri)
    .then(() => console.log("mongodb connected mongo uri", uri)))();

app.listen(port, () => console.log("server is running on port", port));
