import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  addToDb,
  deleteShoppingCart,
  getStoredCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

/*
Things needed for pagination 
1/ Count -total amount of data
2/ How many data per page
3/ Identify the current page

*/
//-------------------------------------------------
const Shop = () => {
  //notE useState
  // const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const { count, products } = useLoaderData();
  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  //notE fetch data
  // useEffect(() => {
  //   fetch("products.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //     });
  // }, []);
  //notE lode from db
  useEffect(() => {
    const storedCart = getStoredCart();
    // console.log(storedCart);
    const savedCart = [];
    for (const id in storedCart) {
      // console.log(id);
      const addedProduct = products.find((product) => product._id === id);
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
      (product) => product._id === selectedProduct._id
    );
    // console.log(existProduct);
    if (!existProduct) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      // console.log(rest);

      existProduct.quantity = existProduct.quantity + 1;
      newCart = [...rest, existProduct];
    }
    setCart(newCart);
    addToDb(selectedProduct._id);
    // console.log(newCart);
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            product={product}
            key={product._id}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} clearCart={clearCart}>
          <Link to={"/orders"}>
            <button className="order-review-btn">
              Review Order{" "}
              <FontAwesomeIcon
                // className="delete-icon"
                icon={faArrowCircleRight}
              ></FontAwesomeIcon>
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
