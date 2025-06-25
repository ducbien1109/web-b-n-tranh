// // backend/server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const Product = require("./product.model");
// const Order = require("./orders.model");
// // const User = require("../models/User");
// const app = express();
// app.use(cors());
// // app.use(express.json());
// app.use(express.json({ limit: "10mb" }));

// mongoose
//   .connect("mongodb://localhost:27017/productdb")
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // API routes
// app.get("/products", async (req, res) => {
//   const items = await Product.find();
//   res.json(items);
// });
// // Thêm vào server.js
// app.get("/products/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.json(product);
//   } catch (error) {
//     res.status(404).json({ message: "Không tìm thấy sản phẩm" });
//   }
// });

// app.post("/products", async (req, res) => {
//   const newItem = new Product(req.body); // ✅ dùng req.body để nhận đầy đủ dữ liệu
//   await newItem.save();
//   res.json(newItem);
// });

// app.put("/products/:id", async (req, res) => {
//   const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.json(updated);
// });

// app.delete("/products/:id", async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// });
// //order
// app.post("/orders", async (req, res) => {
//   try {
//     const newOrder = new Order(req.body);
//     await newOrder.save();
//     res.json(newOrder);
//   } catch (error) {
//     console.error("Lỗi khi tạo đơn hàng:", error);
//     res.status(500).json({ message: "Không thể tạo đơn hàng" });
//   }
// });

// // API lấy danh sách đơn hàng
// app.get("/orders", async (req, res) => {
//   try {
//     const orders = await Order.find().populate("productId");
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Không thể lấy đơn hàng" });
//   }
// });
// app.listen(5000, () => console.log("Server running on http://localhost:5000"));
// //

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./product.model");
const Order = require("./orders.model");
const User = require("./user");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Kết nối MongoDB
mongoose
  .connect("mongodb://localhost:27017/productdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// -------------------- ROUTES -------------------- //

// ===== SẢN PHẨM =====

// Lấy tất cả sản phẩm
app.get("/products", async (req, res) => {
  try {
    const items = await Product.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Không thể lấy sản phẩm" });
  }
});

// Lấy sản phẩm theo ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi lấy sản phẩm" });
  }
});

// Thêm sản phẩm mới
app.post("/products", async (req, res) => {
  try {
    const newItem = new Product(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: "Không thể tạo sản phẩm" });
  }
});

// Cập nhật sản phẩm
app.put("/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để cập nhật" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi cập nhật sản phẩm" });
  }
});

// Xóa sản phẩm
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa sản phẩm" });
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi xóa sản phẩm" });
  }
});

// ===== ĐƠN HÀNG =====

// Tạo đơn hàng mới
app.post("/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Không thể tạo đơn hàng" });
  }
});

// Lấy danh sách đơn hàng
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy đơn hàng" });
  }
});

// ===== NGƯỜI DÙNG (Tùy chọn mở rộng) =====

// API tạo người dùng mới (ví dụ)
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: "Không thể tạo người dùng" });
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Tài khoản không tồn tại" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Sai mật khẩu" });
  }

  return res.json({ message: "Đăng nhập thành công", user });
});
// API lấy danh sách người dùng (tuỳ)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy người dùng" });
  }
});

// ------------------------------------------------- //

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
