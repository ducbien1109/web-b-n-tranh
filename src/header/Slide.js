import React from "react";
import "../css/MenuHeader.css";

import slide4 from "../img/s4.jpg";

// const contentStyle = {
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
// };
const Slide = () => {
  return (
    <div className="slide-content">
      <div className="slide">
        <img src={slide4} />
      </div>
      <div className="discover">
        <p>Dành cho nữ</p>
        <h2>BỘ SƯU TẬP PRE-FALL 2025</h2>
        <h5>Khám phá thêm</h5>
      </div>
    </div>
  );
};
export default Slide;
