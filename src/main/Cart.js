import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  return (
    <div>
      <h2>Giỏ hàng của bạn</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {cartItems.map((item) => (
          <div key={item.id}>
            <img src={item.img} style={{ width: "200px", height: "250px" }} />
            <p>{item.name}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
