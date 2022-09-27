import React from "react";
import "./Cart.css";
const Cart = (props) => {
  const { cart } = props;

  let total = 0;
  let shipping = 0;
  let quantity = 0;
  for (const product of cart) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping * product.quantity;
  }
  // const reducer = (previous, current) => previous + current.price;
  // const total = cart.reduce(reducer, 0);
  // const shipping = cart.reduce(
  //   (previous, current) => previous + current.shipping,
  //   0
  // );
  const tax = total * 0.1;
  const grandTotal = total + shipping + tax;

  return (
    <div className="cart">
      <h4>order summary</h4>
      <p>Selected Items: {quantity}</p>
      <p>Total price: ${total}</p>
      <p>Total Shipping: ${shipping}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
    </div>
  );
};

export default Cart;
