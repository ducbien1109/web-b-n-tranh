// import React, { useEffect, useState } from "react";
// import getPostApiProduct from "../api/postApi";
// import { Button, Dropdown, Image } from "antd";
// import { Link } from "react-router-dom";
// import "../css/Content.css";

// const CATEGORIES = [
//   "Tranh sơn dầu",
//   "Tranh sơn mài",
//   "màu nước và mực trên giấy Tuyên",
//   "Gốm men",
//   "màu nước và mực trên giấy Trúc",
//   "màu nước và mực trên lụa",
//   "acrylic trên toan",
// ];

// const Content = () => {
//   const [postProduct, setPostProduct] = useState([]);

//   const getAll = async () => {
//     const response = await getPostApiProduct.getAll();
//     setPostProduct(response.data);
//   };

//   useEffect(() => {
//     getAll();
//   }, []);

//   const handleSortA = async () => {
//     const response = await getPostApiProduct.getAll();
//     const sort = response.data.sort((a, b) => a.price - b.price);
//     setPostProduct(sort);
//   };

//   const handleSortB = async () => {
//     const response = await getPostApiProduct.getAll();
//     const sort = response.data.sort((a, b) => b.price - a.price);
//     setPostProduct(sort);
//   };

//   const items = [
//     {
//       key: "1",
//       label: <span onClick={handleSortA}>Giá từ thấp đến cao</span>,
//     },
//     {
//       key: "2",
//       label: <span onClick={handleSortB}>Giá từ cao đến thấp</span>,
//     },
//   ];

//   return (
//     <div className="content-wrapper">
//       <h2 className="content-title">Thu Hoa Gallery</h2>
//       <div className="btn-sort">
//         <Dropdown menu={{ items }} placement="bottomLeft">
//           <Button>Lọc theo giá</Button>
//         </Dropdown>
//       </div>

//       {CATEGORIES.map((category) => {
//         const productsByCategory = postProduct.filter((product) =>
//           product.categories?.includes(category)
//         );

//         if (productsByCategory.length === 0) return null;

//         return (
//           <div className="category-section" key={category}>
//             <h1 className="category-title">{category}</h1>
//             <div className="product-list">
//               {productsByCategory.map((product) => (
//                 <div className="product-card" key={product._id}>
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     className="product-image"
//                     preview={false}
//                   />
//                   <Link
//                     to={`/Product-each/${product._id}`}
//                     className="product-link"
//                   >
//                     <p className="product-name">{product.name}</p>
//                     <p className="product-price">${product.price}</p>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Content;

import React, { useEffect, useState, useRef } from "react";
import getPostApiProduct from "../api/postApi";
import { Button, Dropdown, Image } from "antd";
import { Link } from "react-router-dom";
import "../css/Content.css";

const CATEGORIES = [
  "Tranh sơn dầu",
  "Tranh sơn mài",
  "màu nước và mực trên giấy Tuyên",
  "Gốm men",
  "màu nước và mực trên giấy Trúc",
  "màu nước và mực trên lụa",
  "acrylic trên toan",
];

const Content = () => {
  const [postProduct, setPostProduct] = useState([]);
  const productListRefs = useRef({});

  const getAll = async () => {
    const response = await getPostApiProduct.getAll();
    setPostProduct(response.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleSortA = async () => {
    const response = await getPostApiProduct.getAll();
    const sort = response.data.sort((a, b) => a.price - b.price);
    setPostProduct(sort);
  };

  const handleSortB = async () => {
    const response = await getPostApiProduct.getAll();
    const sort = response.data.sort((a, b) => b.price - a.price);
    setPostProduct(sort);
  };

  const items = [
    {
      key: "1",
      label: <span onClick={handleSortA}>Giá từ thấp đến cao</span>,
    },
    {
      key: "2",
      label: <span onClick={handleSortB}>Giá từ cao đến thấp</span>,
    },
  ];

  // ✅ Hiệu ứng khi cuộn tới phần sản phẩm
  useEffect(() => {
    const handleScroll = () => {
      Object.values(productListRefs.current).forEach((el) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
            el.classList.add("animate");
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // gọi ngay để kiểm tra nếu đã hiển thị
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="content-wrapper">
      <h2 className="content-title">Thu Hoa Gallery</h2>
      <div className="btn-sort">
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Button>Filter by price</Button>
        </Dropdown>
      </div>

      {CATEGORIES.map((category) => {
        const productsByCategory = postProduct.filter((product) =>
          product.categories?.includes(category)
        );

        if (productsByCategory.length === 0) return null;

        return (
          <div className="category-section" key={category}>
            <h1 className="category-title">{category}</h1>
            <div
              className="product-list"
              ref={(el) => (productListRefs.current[category] = el)}
            >
              {productsByCategory.map((product, index) => (
                <div
                  className="product-card"
                  key={product._id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    preview={false}
                  />
                  <Link
                    to={`/Product-each/${product._id}`}
                    className="product-link"
                  >
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">${product.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Content;
