const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  comment: String,
  categories: [String], // ✅ sửa từ String → [String]
});

module.exports = mongoose.model("Product", productSchema);
