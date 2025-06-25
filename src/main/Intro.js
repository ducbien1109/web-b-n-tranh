import React from "react";
import { Typography, Row, Col, Card, Image, Divider } from "antd";
import Menuheader from "../header/Menuheader";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ backgroundColor: "#fffaf0" }}>
      <Menuheader />
      <Row justify="center">
        <Col xs={24} sm={24} md={20} lg={16}>
          <Card
            bordered={false}
            style={{ background: "#ffffff", padding: "20px" }}
            bodyStyle={{ padding: 0 }} // loại bỏ padding mặc định
          >
            <Image
              src="https://png.pngtree.com/thumb_back/fh260/background/20230411/pngtree-flowers-spring-watercolor-pink-background-image_2204880.jpg"
              alt="Tranh nghệ thuật"
              width="100%"
              height="auto"
              style={{
                objectFit: "cover",
                borderRadius: "12px",
                maxHeight: 400,
              }}
              preview={false}
            />

            <div>
              <Divider />
              <Typography>
                <Title level={2} style={{ color: "#7c3e2e" }}>
                  🎨 Cửa Hàng Tranh Hội An - Nghệ Sĩ Ngô Đức Chí
                </Title>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.7 }}>
                  Chào mừng bạn đến với không gian nghệ thuật của họa sĩ{" "}
                  <strong>Ngô Đức Chí</strong> – một người con của phố cổ Hội
                  An. Với niềm đam mê hội họa từ nhỏ, anh đã dành cả đời để lưu
                  giữ vẻ đẹp quê hương qua từng bức tranh sơn dầu, màu nước và
                  tranh lụa.
                </Paragraph>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.7 }}>
                  Mỗi tác phẩm đều chứa đựng cảm xúc, ký ức và hồn quê – từ
                  những con phố rêu phong của Hội An, đến những làng chài ven
                  biển bình dị. Không gian trưng bày tại cửa hàng được thiết kế
                  để mang đến trải nghiệm gần gũi, ấm áp và truyền cảm hứng cho
                  những ai yêu nghệ thuật.
                </Paragraph>
                <Paragraph style={{ fontSize: 16, lineHeight: 1.7 }}>
                  Chúng tôi hy vọng nơi đây sẽ là điểm dừng chân thú vị cho bạn
                  – dù bạn là người sưu tầm, đam mê nghệ thuật, hay chỉ đơn giản
                  là yêu cái đẹp của Việt Nam.
                </Paragraph>
                <Divider />
                <Title level={4}>📍 Thông tin liên hệ</Title>
                <Paragraph style={{ fontSize: 15 }}>
                  <strong>Địa chỉ:</strong> 45 Trần Phú, Phố cổ Hội An
                  <br />
                  <strong>Điện thoại:</strong> 0905 123 456
                  <br />
                  <strong>Email:</strong> tranhnghethuat.ngoducchi@gmail.com
                </Paragraph>
              </Typography>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;
