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
            🎨 NGO DUC CHI GALLERY
          </Title>
          <Text style={{ color: "#aaa" }}>
            Tôn vinh vẻ đẹp Hội An qua từng bức tranh mang đậm hồn Việt. Không
            gian nghệ thuật nơi lưu giữ ký ức và cảm xúc chân thực.
          </Text>
        </Col>

        <Col xs={24} md={8}>
          <Title level={4} style={{ color: "#fff" }}>
            📍 Contact
          </Title>
          <p style={{ color: "#ccc", margin: 0 }}>
            <EnvironmentOutlined /> 13 Nguyen hue, Hoi an, Thanh pho Da Nang,
            Viet Nam
          </p>
          <p style={{ color: "#ccc", margin: 0 }}>
            <PhoneOutlined />
            +84 0905 659 702
          </p>
          <p style={{ color: "#ccc", margin: 0 }}>
            <MailOutlined /> ducchi.hangiang@gmail.com
          </p>
        </Col>

        <Col xs={24} md={6}>
          <Title level={4} style={{ color: "#fff" }}>
            🌐 social network
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
          © {new Date().getFullYear()} Ngo Duc Chi Gallery.
        </Text>
      </div>
    </Footer>
  );
};

export default CustomFooter;
