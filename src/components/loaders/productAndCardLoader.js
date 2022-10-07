// import React from 'react';

import { getStoredCart } from "../../utilities/fakedb";

export const productAndCardLoader = async () => {
  // Get products
  const productsData = await fetch("products.json");
  const products = await productsData.json();

  // Get saved cart
  const savedCart = getStoredCart();
  const initialProduct = [];

  //get the id's in the saved cart
  for (const id in savedCart) {
    //get the product with this id from the all products
    const addedProduct = products.find((product) => product.id === id);
    // Update the product's quantity with the savedCart's id's quantity
    if (addedProduct) {
      const quantity = savedCart[id];
      addedProduct.quantity = quantity;
      //Then push those products into a new array, which is now basically the previously added product's array.
      initialProduct.push(addedProduct);
    }
  }
  return { products, initialProduct };
};

//we have to do all this steps to find the previously added products with their specific added quantity. Because we saved the added product to the local storage as id and their added quantity.
