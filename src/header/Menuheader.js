// // import React from "react";
// // import "../css/MenuHeader.css";
// // import {
// //   UnorderedListOutlined,
// //   SearchOutlined,
// //   HeartOutlined,
// //   UserOutlined,
// //   DownOutlined,
// //   ShoppingCartOutlined,
// // } from "@ant-design/icons";
// // import { Button, Dropdown } from "antd";
// // import { useNavigate } from "react-router";
// // const Menuheader = () => {
// //   const navigate = useNavigate();

// //   const handleToCart = () => {
// //     navigate("/cart");
// //   };
// //   const handleIntro = () => {
// //     navigate("/intro");
// //   };
// //   return (
// //     <div>
// //       <div className="container">
// //         <div className="menu header-left">
// //           <UnorderedListOutlined />
// //           <p>Menu</p>
// //           <SearchOutlined />
// //           <p>Tìm kiếm</p>
// //         </div>
// //         <div className="menu Name-brand">HOI AN GALLERY</div>
// //         <div className="menu header-right">
// //           <p style={{ cursor: "pointer" }} onClick={handleIntro}>
// //             Introduce
// //           </p>
// //           <p>Contact</p>
// //           <UserOutlined />
// //           <ShoppingCartOutlined onClick={handleToCart} />
// //         </div>
// //       </div>
// //       <div className="choose">
// //         <div
// //           style={{
// //             display: "flex",
// //             alignItems: "center",
// //             gap: "10px",
// //           }}
// //         >
// //           {/* <p>Mới nhất</p>
// //           <DownOutlined /> */}
// //         </div>
// //         <div></div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Menuheader;

// ///////
// import React, { useState } from "react";
// import "../css/MenuHeader.css";
// import {
//   UnorderedListOutlined,
//   SearchOutlined,
//   UserOutlined,
//   ShoppingCartOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router";

// const Menuheader = () => {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleToCart = () => {
//     navigate("/cart");
//   };

//   const handleIntro = () => {
//     navigate("/intro");
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   const Home = () => {
//     navigate("/");
//   };
//   const handleSearch = ()=>{
//     if(){

//     }
//   }
//   return (
//     <div>
//       <div className="container">
//         <div className="header-left">
//           <UnorderedListOutlined className="menu-icon" onClick={toggleMenu} />
//           <SearchOutlined className="icon" onClick={handleSearch}/>
//         </div>

//         <div className="Name-brand">THU HOA GALLERY</div>

//         <div className="header-right">
//           <p onClick={Home}>Home</p>
//           <p onClick={handleIntro}>Introduce</p>
//           {/* <p>Contact</p> */}
//           {/* <UserOutlined className="icon" /> */}
//           <ShoppingCartOutlined className="icon" onClick={handleToCart} />
//         </div>
//       </div>

//       {/* Menu mobile hiện ra khi click */}
//       {isMenuOpen && (
//         <div className="mobile-menu">
//           <p onClick={Home}>Home</p>
//           <p onClick={handleIntro}>Introduce</p>
//           {/* <p>Contact</p> */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Menuheader;

import React, { useState } from "react";
import "../css/MenuHeader.css";
import {
  UnorderedListOutlined,
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { Input } from "antd";

const Menuheader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // mở menu trái
  const [isSearchVisible, setIsSearchVisible] = useState(false); // hiện input tìm kiếm
  const [searchValue, setSearchValue] = useState(""); // giá trị input

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    setIsSearchVisible(!isSearchVisible); // bật/tắt input tìm kiếm
    const input = document.querySelector(".Name-brand");

    if (input) {
      input.style.display = !isSearchVisible ? "none" : "block";
    }
  };

  const handleToCart = () => {
    navigate("/cart");
  };

  const handleIntro = () => {
    navigate("/intro");
  };

  const handleHome = () => {
    navigate("/");
  };
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    
    // Bạn có thể gọi API tìm kiếm ở đây nếu cần
  };

  return (
    <div>
      <div className="container">
        <div className="header-left">
          <UnorderedListOutlined className="menu-icon" onClick={toggleMenu} />
          <SearchOutlined className="icon" onClick={handleSearch} />
          {isSearchVisible && (
            <Input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
          )}
        </div>

        <div className="Name-brand" onClick={handleHome}>
          THU HOA GALLERY
        </div>

        <div className="header-right">
          <p onClick={handleHome}>Home</p>
          <p onClick={handleIntro}>Introduce</p>
          {/* <UserOutlined className="icon" /> */}
          <ShoppingCartOutlined className="icon" onClick={handleToCart} />
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <p onClick={handleHome}>Home</p>
          <p onClick={handleIntro}>Introduce</p>
        </div>
      )}
    </div>
  );
};

export default Menuheader;
