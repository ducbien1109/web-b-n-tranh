// backend/createAdmin.js
const mongoose = require("mongoose");
const User = require("./user");

mongoose.connect("mongodb://localhost:27017/productdb").then(async () => {
  const adminExist = await User.findOne({ username: "admin" });
  if (adminExist) {
    console.log("⚠️ Admin đã tồn tại");
  } else {
    const admin = new User({
      username: "admin",
      password: "123456",
    });
    await admin.save();
    console.log("✅ Tạo tài khoản admin thành công");
  }
  mongoose.disconnect();
});
