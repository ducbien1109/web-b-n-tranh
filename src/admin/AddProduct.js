// import { Button, Card, Form, Input, Select } from "antd";
// import React, { useEffect, useState } from "react";
// import getPostApiProduct from "../api/postApi";
// import { toast } from "react-toastify";
// import Loading from "./Loading";
// import { useNavigate, useParams } from "react-router";

// const OPTIONS = [
//   "Tranh sơn dầu",
//   "Tranh sơn mài",
//   "Tranh màu nước	",
//   "Tranh chì",
//   "Tranh lụa",
// ];
// const AddProduct = () => {
//   const { id } = useParams();

//   const [isLoading, setIsLoading] = useState(false);
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   const resetForm = () => {
//     form.resetFields();
//   };
//   const create = async (values) => {
//     try {
//       setIsLoading(true);
//       await getPostApiProduct.create(values);
//       toast.success("Thêm thành công");
//       resetForm();
//       navigate("/admin"); // ✅ thêm dòng này để quay về trang admin
//     } catch (error) {
//       toast.error("Vui lòng kiểm tra lại");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const update = async (values) => {
//     try {
//       setIsLoading(true);
//       await getPostApiProduct.update(id, values);
//       toast.success("cập nhật thành công");
//       resetForm();
//       navigate("/admin");
//     } catch (error) {
//       toast.error("Vui lòng kiểm tra lại");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const onSubmit = (value) => {
//     if (id) {
//       update(value);
//     } else {
//       create(value);
//     }
//   };
//   const getProduct = async () => {
//     try {
//       const { data } = await getPostApiProduct.getDetail(id);
//       if (typeof data.categories === "string") {
//         data.categories = [data.categories]; // ✅ chuyển thành mảng nếu là chuỗi
//       }
//       form.setFieldsValue(data);
//     } catch (error) {
//       toast.error("Vui lòng kiểm tra lại");
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       getProduct();
//     }
//   }, [id]);
//   return (
//     <div style={{ backgroundColor: "#dddddd", minHeight: "100vh" }}>
//       {isLoading && <Loading />}
//       <Card
//         title={id ? "Edit" : "Thêm mới"}
//         style={{ width: 700, margin: "0 auto", textAlign: "center" }}
//       >
//         <Form layout="vertical" form={form} onFinish={onSubmit}>
//           <Form.Item
//             name="name"
//             label="Tên sản phẩm"
//             rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
//           >
//             <Input placeholder="Tên sản phẩm" />
//           </Form.Item>

//           <Form.Item
//             name="price"
//             label="Giá sản phẩm"
//             rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
//           >
//             <Input placeholder="Giá sản phẩm" />
//           </Form.Item>

//           <Form.Item
//             name="image"
//             label="Ảnh sản phẩm"
//             rules={[{ required: true, message: "Vui lòng nhập ảnh sản phẩm" }]}
//           >
//             <Input placeholder="Link ảnh" />
//           </Form.Item>

//           <Form.Item
//             name="description"
//             label="Chi tiết sản phẩm"
//             rules={[{ required: true, message: "Vui lòng nhập chi tiết" }]}
//           >
//             <Input.TextArea placeholder="Chi tiết sản phẩm" rows={6} />
//           </Form.Item>

//           <Form.Item
//             name="categories"
//             label="Loại"
//             rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm" }]}
//           >
//             <Select
//               mode="multiple"
//               placeholder="Chọn loại sản phẩm"
//               style={{ width: "100%" }}
//               options={OPTIONS.map((item) => ({
//                 value: item,
//                 label: item,
//               }))}
//             />
//           </Form.Item>

//           <Button htmlType="submit" type="primary">
//             {id ? "edit" : "Thêm sản phẩm"}
//           </Button>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default AddProduct;

import { Button, Card, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import getPostApiProduct from "../api/postApi";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { useNavigate, useParams } from "react-router";

const OPTIONS = [
  "Tranh sơn dầu",
  "Tranh sơn mài",
  "Tranh màu nước",
  "Gốm",
  "Tranh lụa",
];

const AddProduct = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Hàm chuyển ảnh sang base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Tạo sản phẩm
  const create = async (values) => {
    try {
      setIsLoading(true);
      await getPostApiProduct.create(values);
      toast.success("Thêm thành công");
      form.resetFields();
      navigate("/admin");
    } catch (error) {
      toast.error("Vui lòng kiểm tra lại");
    } finally {
      setIsLoading(false);
    }
  };

  // Cập nhật sản phẩm
  const update = async (values) => {
    try {
      setIsLoading(true);
      await getPostApiProduct.update(id, values);
      toast.success("Cập nhật thành công");
      form.resetFields();
      navigate("/admin");
    } catch (error) {
      toast.error("Vui lòng kiểm tra lại");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit form
  const onSubmit = async (values) => {
    const { image, ...rest } = values;

    if (!image || image.length === 0) {
      toast.error("Vui lòng chọn ảnh");
      return;
    }

    let base64Image = "";

    if (image[0].originFileObj) {
      base64Image = await toBase64(image[0].originFileObj);
    } else if (image[0].url) {
      base64Image = image[0].url;
    } else {
      toast.error("Ảnh không hợp lệ");
      return;
    }

    const finalData = {
      ...rest,
      image: base64Image,
    };

    if (id) {
      update(finalData);
    } else {
      create(finalData);
    }
  };

  // Lấy dữ liệu sản phẩm khi chỉnh sửa
  const getProduct = async () => {
    try {
      const { data } = await getPostApiProduct.getDetail(id);
      if (typeof data.categories === "string") {
        data.categories = [data.categories];
      }

      // Gắn sẵn ảnh dạng fileList để preview lại ảnh cũ
      const fileList = data.image
        ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: data.image,
            },
          ]
        : [];

      form.setFieldsValue({
        ...data,
        image: fileList,
      });
    } catch (error) {
      toast.error("Vui lòng kiểm tra lại");
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  return (
    <div
      style={{
        backgroundColor: "#dddddd",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {isLoading && <Loading />}
      <Card
        title={id ? "Chỉnh sửa sản phẩm" : "Thêm mới sản phẩm"}
        style={{ maxWidth: 700, margin: "0 auto" }}
      >
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
          >
            <Input placeholder="Giá sản phẩm" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Ảnh sản phẩm"
            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="description"
            label="Chi tiết sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập chi tiết" }]}
          >
            <Input.TextArea rows={5} placeholder="Chi tiết sản phẩm" />
          </Form.Item>

          <Form.Item
            name="categories"
            label="Loại sản phẩm"
            rules={[{ required: true, message: "Vui lòng chọn loại" }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn loại"
              options={OPTIONS.map((item) => ({
                value: item,
                label: item,
              }))}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            {id ? "Cập nhật" : "Thêm sản phẩm"}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddProduct;
