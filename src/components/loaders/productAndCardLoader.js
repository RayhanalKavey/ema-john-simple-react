// import React from 'react';

import { getStoredCart } from "../../utilities/fakedb";

export const productAndCardLoader = async () => {
  // Get products
  const productsData = await fetch("http://localhost:5005/products");
  const { products } = await productsData.json();

  // Get saved cart
  const savedCart = getStoredCart();
  // console.log(savedCart);
  const initialCart = [];

  //get the id's in the saved cart
  for (const id in savedCart) {
    //get the product with this id from the all products
    const addedProduct = products.find((product) => product._id === id);
    // Update the product's quantity with the savedCart's id's quantity
    if (addedProduct) {
      const quantity = savedCart[id];
      addedProduct.quantity = quantity;
      //Then push those products into a new array, which is now basically the previously added product's array.
      initialCart.push(addedProduct);
    }
  }
  return { products, initialCart };
};

//we have to do all this steps to find the previously added products with their specific added quantity. Because we saved the added product to the local storage as id and their added quantity.
