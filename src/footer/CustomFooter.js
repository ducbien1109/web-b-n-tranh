import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import {
  FacebookFilled,
  InstagramFilled,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Text, Title } = Typography;

const CustomFooter = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#1a1a1a",
        color: "#fff",
        padding: "40px 50px",
      }}
    >
      <Row gutter={[32, 24]} justify="space-between">
        <Col xs={24} md={8}>
          <Title level={4} style={{ color: "#fff" }}>
            🎨 NGÔ ĐỨC CHÍ GALLERY
          </Title>
          <Text style={{ color: "#aaa" }}>
            Tôn vinh vẻ đẹp Hội An qua từng bức tranh mang đậm hồn Việt. Không
            gian nghệ thuật nơi lưu giữ ký ức và cảm xúc chân thực.
          </Text>
        </Col>

        <Col xs={24} md={8}>
          <Title level={4} style={{ color: "#fff" }}>
            📍 Liên hệ
          </Title>
          <p style={{ color: "#ccc", margin: 0 }}>
            <EnvironmentOutlined /> 45 Trần Phú, Hội An
          </p>
          <p style={{ color: "#ccc", margin: 0 }}>
            <PhoneOutlined /> 0905 123 456
          </p>
          <p style={{ color: "#ccc", margin: 0 }}>
            <MailOutlined /> tranhnghethuat.ngoducchi@gmail.com
          </p>
        </Col>

        <Col xs={24} md={6}>
          <Title level={4} style={{ color: "#fff" }}>
            🌐 Mạng xã hội
          </Title>
          <p>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FacebookFilled
                style={{ fontSize: 24, color: "#3b5998", marginRight: 16 }}
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <InstagramFilled style={{ fontSize: 24, color: "#e1306c" }} />
            </a>
          </p>
        </Col>
      </Row>

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Text style={{ color: "#ffffff" }}>
          © {new Date().getFullYear()} Ngô Đức Chí Gallery.
        </Text>
      </div>
    </Footer>
  );
};

export default CustomFooter;
