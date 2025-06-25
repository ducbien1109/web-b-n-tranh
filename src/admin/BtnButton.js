import { Button } from "antd";
import React from "react";

const BtnButton = (prop) => {
  const { color, handleClick, name } = prop;
  return (
    <div>
      <Button type={color} onClick={handleClick} danger>
        {name}
      </Button>
    </div>
  );
};

export default BtnButton;
