// import React, { useEffect, useState } from "react";
// import getPostApiProduct from "../api/postApi";
// import { Button, Card, Dropdown, Image } from "antd";
// import { Link } from "react-router-dom";
// import "../css/MenuHeader.css";
// const CATEGORIES = [
//   "Tranh sơn dầu",
//   "Tranh sơn mài",
//   "Tranh màu nước	",
//   "Tranh chì",
//   "Tranh lụa",
// ];

// const Content = () => {
//   const [postProduct, setPostProduct] = useState([]);

//   const getAll = async () => {
//     const response = await getPostApiProduct.getAll();
//     // const sort = response.data.sort((a, b) => a.price - b.price);
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
//       label: (
//         <a
//           target="_blank"
//           rel="noopener noreferrer"
//           // href="https://www.antgroup.com"
//           onClick={handleSortA}
//         >
//           Giá từ thấp đến cao
//         </a>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//         <a
//           target="_blank"
//           rel="noopener noreferrer"
//           // href="https://www.aliyun.com"
//           onClick={handleSortB}
//         >
//           Giá từ cao đến thấp
//         </a>
//       ),
//     },
//   ];
//   return (
//     <div>
//       <h2 style={{ textAlign: "center", padding: "20px 0" }}>
//         Explore the unique creations of Hoi An Gallery
//       </h2>
//       <div className="btn-sort">
//         <Dropdown menu={{ items }} placement="bottomLeft">
//           <Button>price filter</Button>
//         </Dropdown>
//       </div>
//       {CATEGORIES.map((category) => {
//         const productsByCategory = postProduct.filter((product) =>
//           product.categories?.includes(category)
//         );

//         if (productsByCategory.length === 0) return null; // bỏ section nếu không có sp

//         return (
//           <div key={category} style={{ marginBottom: "40px" }}>
//             <h1>{category}</h1>
//             <div
//               style={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 gap: "20px",
//                 padding: "0 50px",
//                 textAlign: "center",
//               }}
//             >
//               {productsByCategory.map((product) => (
//                 <div key={product.id} style={{ width: 300 }}>
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     style={{ width: "100%", height: 400 }}
//                   />
//                   <Link
//                     to={`/Product-each/${product._id}`}
//                     style={{ textDecoration: "none", color: "gray" }}
//                   >
//                     <p>{product.name}</p>
//                     <p>${product.price}</p>
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

import React, { useEffect, useState } from "react";
import getPostApiProduct from "../api/postApi";
import { Button, Dropdown, Image } from "antd";
import { Link } from "react-router-dom";
import "../css/Content.css";

const CATEGORIES = [
  "Tranh sơn dầu",
  "Tranh sơn mài",
  "Tranh màu nước",
  "Gốm",
  "Tranh lụa",
];

const Content = () => {
  const [postProduct, setPostProduct] = useState([]);

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

  return (
    <div className="content-wrapper">
      <h2 className="content-title">
        Explore the unique creations of Thu Hoa Gallery
      </h2>
      <div className="btn-sort">
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Button>Lọc theo giá</Button>
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
            <div className="product-list">
              {productsByCategory.map((product) => (
                <div className="product-card" key={product._id}>
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
