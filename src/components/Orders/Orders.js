import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Orders.css";
const Orders = () => {
  const { products, initialCart } = useLoaderData();
  const [cart, setCart] = useState(initialCart);
  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  const handleRemoveItems = (ID) => {
    const remainingProducts = cart.filter((product) => product.id !== ID);
    setCart(remainingProducts);
    removeFromDb(ID);
  };
  return (
    <div className="shop-container">
      <div className="order-container">
        {cart.map((product) => (
          <ReviewItem
            key={product.id}
            product={product}
            handleRemoveItems={handleRemoveItems}
          ></ReviewItem>
        ))}
        {cart.length === 0 && (
          <div className="no-item">
            No items added to the cart.{" "}
            <div style={{ marginLeft: "10px" }}>
              {" "}
              <Link to={"/shop"}>Shop Now!!</Link>
            </div>
          </div>
        )}
      </div>
      <div className="cart-container">
        <Cart clearCart={clearCart} cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Orders;
