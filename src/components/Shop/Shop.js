import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Shop.css";
//-------------------------------------------------
const Shop = () => {
  //useState
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  //fetch data
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  //click event handler
  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    // console.log(newCart);
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            product={product}
            key={product.id}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <h4>order summary</h4>
        <p>Selected Items: {cart.length}</p>
      </div>
    </div>
  );
};

export default Shop;
