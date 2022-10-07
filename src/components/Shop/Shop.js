import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
//-------------------------------------------------
const Shop = () => {
  //notE useState
  // const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const products = useLoaderData();
  //notE fetch data
  // useEffect(() => {
  //   // console.log("product load before fetch");
  //   fetch("products.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //       // console.log("products loaded");
  //     });
  // }, []);
  //notE lode from db
  useEffect(() => {
    // console.log("local storage first line");

    const storedCart = getStoredCart();
    // console.log(storedCart);
    const savedCart = [];
    for (const id in storedCart) {
      // console.log(id);
      const addedProduct = products.find((product) => product.id === id);
      //?
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
        // console.log(savedCart);
      }
    }
    setCart(savedCart);
    // console.log("local storage finished");
  }, [products]);
  //click event handler
  const handleAddToCart = (selectedProduct) => {
    // console.log(selectedProduct);
    // console.log(cart);
    let newCart;
    //workinG
    const existProduct = cart.find(
      (product) => product.id === selectedProduct.id
    );
    // console.log(existProduct);
    if (!existProduct) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      // console.log(rest);

      existProduct.quantity = existProduct.quantity + 1;
      newCart = [...rest, existProduct];
    }
    setCart(newCart);
    addToDb(selectedProduct.id);
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
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
