// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // ✅ đúng
// import getPostApiProduct from "../api/postApi";
// import { useParams } from "react-router-dom";
// import { ShoppingCartOutlined } from "@ant-design/icons";
// import { toast } from "react-toastify";
// import Menuheader from "../header/Menuheader";
// import axios from "axios";

// import { Button, Modal, Input, Form } from "antd";
// const DetailProduct = () => {
//   const { id } = useParams();
//   const [detailProduct, setDetailProduct] = useState({});
//   const [relateProduct, setRelateProduct] = useState([]);
//   const [cartProduct, setCartProduct] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const navigate = useNavigate();
//   const [form] = Form.useForm();

//   const getDetail = async (id) => {
//     try {
//       const response = await getPostApiProduct.getDetail(id);
//       console.log("✅ Chi tiết sản phẩm:", response.data); // <== kiểm tra ở đây

//       const product = response.data;
//       setDetailProduct(product);

//       // Sau khi có detailProduct, tìm các sản phẩm cùng loại
//       if (product.categories && product.categories.length > 0) {
//         getRelated(product.categories[0]); // Ví dụ dùng categories[0] là "Túi xách"
//       }
//     } catch (error) {
//       console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
//     }
//   };
//   const getRelated = async (categoryName) => {
//     try {
//       const res = await getPostApiProduct.getAll();
//       const related = res.data.filter((item) =>
//         item.categories.includes(categoryName)
//       );
//       setRelateProduct(related);
//     } catch (error) {
//       console.error("Lỗi khi lấy danh sách sản phẩm:", error);
//     }
//   };
//   useEffect(() => {
//     if (id) {
//       getDetail(id);
//     }
//   }, [id]);
//   const handleCart = () => {
//     // Lấy danh sách giỏ hàng từ localStorage (nếu có)
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];

//     // Kiểm tra sản phẩm đã có trong giỏ chưa
//     const isExist = cart.find((item) => item._id === detailProduct._id);
//     if (!isExist) {
//       cart.push(detailProduct); // Thêm sản phẩm mới
//     }
//     // Lưu lại vào localStorage
//     localStorage.setItem("cart", JSON.stringify(cart));
//     // Chuyển đến trang giỏ hàng
//     navigate("/cart");
//   };
//   const handleProductRelated = (productId) => {
//     navigate(`/Product-each/${productId}`);
//   };
//   // const handleToAdmin = () => {
//   //   const orders = JSON.parse(localStorage.getItem("orders")) || [];
//   //   // Kiểm tra xem sản phẩm đã tồn tại chưa (tuỳ bạn có muốn cho phép mua trùng không)
//   //   const isExist = orders.find((item) => item._id === detailProduct._id);
//   //   if (!isExist) {
//   //     orders.push(detailProduct);
//   //   }

//   //   // Lưu lại vào localStorage
//   //   localStorage.setItem("orders", JSON.stringify(orders));
//   //   // Điều hướng sang trang orders
//   //   toast.success("Mua thàng công");
//   // };
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   const handleSubmit = async (values) => {
//     const newOrder = {
//       productId: detailProduct._id,
//       image: detailProduct.image, // ✅ thêm dòng này
//       price: detailProduct.price, // ✅ thêm dòng này
//       ...values,
//       status: "Chờ xử lý",
//     };

//     try {
//       // gửi lên MongoDB
//       await axios.post("http://localhost:5000/orders", newOrder);

//       // lưu localStorage nếu muốn
//       const orders = JSON.parse(localStorage.getItem("orders")) || [];
//       orders.push({ ...detailProduct, ...values, status: "Chờ xử lý" });
//       localStorage.setItem("orders", JSON.stringify(orders));

//       toast.success("Đặt hàng thành công");
//       form.resetFields();
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Lỗi gửi đơn hàng:", error);
//       toast.error("Gửi đơn hàng thất bại");
//     }
//   };
//   const handleToAdmin = () => {};
//   return (
//     <div key={detailProduct._id}>
//       <Menuheader />
//       <div style={{ display: "flex", gap: "10px", padding: "10px 50px" }}>
//         <div>
//           <img
//             src={detailProduct.image}
//             style={{ width: "300px", height: "400px" }}
//           />
//         </div>
//         <div>
//           <h2>{detailProduct.name}</h2>
//           <h4>${detailProduct.price}</h4>
//           <p>
//             {detailProduct.description &&
//               detailProduct.description
//                 .split("\n")
//                 .map((line, index) => <p key={index}>{line}</p>)}
//           </p>
//           <div className="buyDetail">
//             <ShoppingCartOutlined
//               style={{ fontSize: "50px", cursor: "pointer" }}
//               onClick={handleCart}
//             />
//             {/* <Button onClick={() => handleToAdmin(id)}>Mua ngay</Button> */}
//             <Button onClick={showModal}>Mua ngay</Button>
//           </div>
//         </div>
//       </div>
//       <h2 style={{ padding: "30px 0" }}>
//         sản phẩm cùng loại {detailProduct.categories?.[0]}
//       </h2>
//       <div style={{ display: "flex", gap: 20 }}>
//         {relateProduct
//           .filter((item) => item._id !== detailProduct._id) // ✅
//           .map((item) => (
//             <div key={item._id}>
//               <img
//                 src={item.image} // ✅ nên dùng item.image thay vì item.img
//                 alt={item.name}
//                 style={{ width: "300px", height: "400px" }}
//               />
//               <p
//                 onClick={() => handleProductRelated(item._id)} // ✅
//                 style={{
//                   cursor: "pointer",
//                   color: "gray",
//                   fontSize: 20,
//                   textAlign: "center",
//                 }}
//               >
//                 {item.name}
//               </p>
//             </div>
//           ))}
//       </div>
//       <Modal
//         title="Basic Modal"
//         closable={{ "aria-label": "Custom Close Button" }}
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSubmit}
//           initialValues={{ quantity: 1 }}
//         >
//           <Form.Item
//             label="Tên khách hàng"
//             name="name"
//             rules={[{ required: true, message: "Vui lòng nhập tên" }]}
//           >
//             <Input placeholder="Nhập tên khách hàng" />
//           </Form.Item>

//           <Form.Item
//             label="Số điện thoại"
//             name="phone"
//             rules={[
//               { required: true, message: "Vui lòng nhập số điện thoại" },
//               { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" },
//             ]}
//           >
//             <Input placeholder="Nhập số điện thoại" />
//           </Form.Item>

//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: "Vui lòng nhập email" },
//               { type: "email", message: "Email không hợp lệ" },
//             ]}
//           >
//             <Input placeholder="Nhập email" />
//           </Form.Item>

//           <Form.Item
//             label="Số lượng"
//             name="quantity"
//             rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
//           >
//             <Input type="number" min={1} />
//           </Form.Item>

//           <Form.Item
//             label="Địa chỉ"
//             name="address"
//             rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
//           >
//             <Input.TextArea placeholder="Nhập địa chỉ" rows={3} />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Gửi thông tin
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default DetailProduct;

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Modal, Input, Form } from "antd";

import getPostApiProduct from "../api/postApi";
import Menuheader from "../header/Menuheader";

import "../css/DetailProduct.css";
import CustomFooter from "../footer/CustomFooter";

const DetailProduct = () => {
  const { id } = useParams();
  const [detailProduct, setDetailProduct] = useState({});
  const [relateProduct, setRelateProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const imageRef = useRef();

  const getDetail = async (id) => {
    try {
      const response = await getPostApiProduct.getDetail(id);
      const product = response.data;
      setDetailProduct(product);

      if (product.categories && product.categories.length > 0) {
        getRelated(product.categories[0]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    }
  };

  const getRelated = async (categoryName) => {
    try {
      const res = await getPostApiProduct.getAll();
      const related = res.data.filter((item) =>
        item.categories.includes(categoryName)
      );
      setRelateProduct(related);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id]);

  const handleCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isExist = cart.find((item) => item._id === detailProduct._id);
    if (!isExist) {
      cart.push(detailProduct);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  const handleProductRelated = (productId) => {
    navigate(`/Product-each/${productId}`);
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = async (values) => {
    const newOrder = {
      productId: detailProduct._id,
      image: detailProduct.image,
      price: detailProduct.price,
      ...values,
      status: "Chờ xử lý",
    };

    try {
      await axios.post("http://localhost:5000/orders", newOrder);
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push({ ...detailProduct, ...values, status: "Chờ xử lý" });
      localStorage.setItem("orders", JSON.stringify(orders));
      toast.success("Đặt hàng thành công");
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi gửi đơn hàng:", error);
      toast.error("Gửi đơn hàng thất bại");
    }
  };
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    if (imageRef.current) {
      imageRef.current.style.transformOrigin = `${x}% ${y}%`;
      imageRef.current.style.transform = "scale(2)";
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "scale(1)";
    }
  };
  //cuộn
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      getDetail(id);
    }
  }, [id]);

  return (
    <div>
      <Menuheader />
      <div className="detail-container">
        <div className="zoom-container">
          <img
            src={detailProduct.image}
            alt={detailProduct.name}
            className="zoom-image"
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>

        <div className="detail-info">
          <h2>{detailProduct.name}</h2>
          <h4>${detailProduct.price}</h4>
          {detailProduct.description &&
            detailProduct.description
              .split("\n")
              .map((line, i) => <p key={i}>{line}</p>)}
          <div className="buyDetail">
            <ShoppingCartOutlined
              style={{ fontSize: "40px", cursor: "pointer" }}
              onClick={handleCart}
            />
            <Button type="primary" onClick={showModal}>
              Mua ngay
            </Button>
          </div>
        </div>
      </div>

      <h2 className="related-title">
        Sản phẩm cùng loại: {detailProduct.categories?.[0]}
      </h2>
      <div className="related-products">
        {relateProduct
          .filter((item) => item._id !== detailProduct._id)
          .map((item) => (
            <div
              className="related-item"
              key={item._id}
              onClick={() => handleProductRelated(item._id)}
            >
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
      </div>

      <Modal
        title="Thông tin đặt hàng"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ quantity: 1 }}
        >
          <Form.Item
            label="Tên khách hàng"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input placeholder="Nhập tên khách hàng" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi thông tin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <CustomFooter />
    </div>
  );
};

export default DetailProduct;
