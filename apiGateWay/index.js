const authMiddleware = require("./middleware/authMiddleware")
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const app = express();

// Proxy routes to microservices
app.use("/users", createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true }));
app.use("/products", createProxyMiddleware({ target: "http://localhost:5002", changeOrigin: true }));
app.use("/cart", authMiddleware, createProxyMiddleware({ target: "http://localhost:5003", changeOrigin: true }));
app.use("/order", authMiddleware, createProxyMiddleware({ target: "http://localhost:5004", changeOrigin: true }));
app.use("/payment", authMiddleware,createProxyMiddleware({ target: "http://localhost:5005", changeOrigin: true }));

app.get("/", (req, res) => res.send("API Gateway is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port http://localhost:${PORT}`));