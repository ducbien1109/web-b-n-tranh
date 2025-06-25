// backend/order.model.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  phone: String,
  email: String,
  address: String,
  quantity: Number,
  image: String,
  price: Number,
  status: { type: String, default: "Chờ xử lý" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
