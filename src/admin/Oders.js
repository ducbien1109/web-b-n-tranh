import { Table, Image, Select } from "antd";
import React, { useEffect, useState } from "react";
import getPostApiProduct from "../api/postApi";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // ✅ Lấy dữ liệu từ MongoDB
  const fetchOrders = async () => {
    try {
      const res = await getPostApiProduct.getAllOrders(); // bạn cần có hàm này trong postApi
      setOrders(res.data);
    } catch (error) {
      console.error("Lỗi lấy đơn hàng:", error);
      toast.error("Không thể lấy đơn hàng");
    }
  };

  useEffect(() => {
    fetchOrders(); // ✅ lấy từ API
  }, []);

  const handleStatusChange = async (value, index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = value;
    setOrders(updatedOrders);

    const orderId = updatedOrders[index]._id; // ✅ dùng _id từ MongoDB

    try {
      await getPostApiProduct.updateOrder(orderId, { status: value }); // bạn cần API này
      toast.success("Cập nhật trạng thái thành công");
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      toast.error("Cập nhật trạng thái thất bại");
    }
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "img",
      render: (img) => (
        <Image
          src={img}
          alt="product"
          width={100}
          height={120}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "name",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "price",
      dataIndex: "price",
      render: (price) => <span>${Number(price).toLocaleString()}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, _, index) => (
        <Select
          defaultValue={status}
          style={{ width: 150 }}
          onChange={(value) => handleStatusChange(value, index)}
          options={[
            { value: "Chờ xử lý", label: "Chờ xử lý" },
            { value: "Đang giao", label: "Đang giao" },
            { value: "Đã giao", label: "Đã giao" },
            { value: "Đã hủy", label: "Đã hủy" },
          ]}
        />
      ),
    },
  ];

  return (
    <div>
      <h2>Danh sách đơn hàng</h2>
      <div>
        {orders.length === 0 ? (
          <p>Chưa có đơn hàng nào.</p>
        ) : (
          <Table
            columns={columns}
            dataSource={orders.map((item) => ({ ...item, key: item._id }))}
            pagination={{ pageSize: 5 }}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
