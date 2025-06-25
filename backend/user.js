const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // nên mã hóa sau này
});

module.exports = mongoose.model("User", userSchema);
