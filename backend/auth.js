const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Tài khoản không tồn tại" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    // Nếu dùng JWT có thể gửi token ở đây
    return res.status(200).json({ message: "Đăng nhập thành công", user });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;
