import React from "react";
import {
  Layout,
  Menu,
  Table,
  Avatar,
  Dropdown,
  Button,
  message,
  Space,
  Popconfirm,
} from "antd";
import type { PopconfirmProps } from "antd";

import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import BtnButton from "./BtnButton";
import getPostApiProduct from "../api/postApi";
import { toast } from "react-toastify";
import Oders from "./Oders";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [postData, getPostData] = useState([]);
  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const AddProduct = () => {
    navigate("/add");
  };
  const fetchData = async () => {
    try {
      const response = await getPostApiProduct.getAll();
      getPostData(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await getPostApiProduct.delete(id);
      toast.success("Xóa thành công");
      await fetchData();
    } catch (error) {
      console.error("❌ Lỗi xóa:", error); // ✅ log lỗi chi tiết
      toast.error("Xóa không thành công");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Loại",
      dataIndex: "categories",
      key: "categories",
      render: (categories) => categories?.join(", "), // ✅ chuyển mảng thành chuỗi
    },
    {
      title: "Chi tiết sản phẩm",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BtnButton
            name="upDate"
            color="primary"
            handleClick={() => navigate(`/admins/edit/${record._id}`)}
          />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPostApiProduct.getAll();
        getPostData(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const handleOder = () => {
    navigate("/orders");
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <div
          className="logo"
          style={{ height: "32px", margin: "16px", background: "#fff" }}
        />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} onClick={handleOder}>
            Orders
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="4" onClick={AddProduct}>
            Thêm sản phẩm
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ marginLeft: 16 }}
          />
          <Dropdown overlay={menu} placement="bottomRight">
            <Avatar style={{ marginRight: 16 }} icon={<UserOutlined />} />
          </Dropdown>
        </Header>
        <Content style={{ margin: "16px" }}>
          <h2>Admin Dashboard</h2>
          <Table columns={columns} dataSource={postData} rowKey="_id" />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
