import React from "react";
import MenuHeader from "./header/Menuheader";
import Slide from "./header/Slide";
import Content from "./main/Content";
import Admin from "./admin/Admin";
import CustomFooter from "./footer/CustomFooter";

const LayoutLv = () => {
  return (
    <div>
      <div>
        <MenuHeader />
      </div>
      <div>
        <Slide />
      </div>
      <div>
        <Content />
      </div>
      <div>
        <CustomFooter />
      </div>
    </div>
  );
};

export default LayoutLv;
