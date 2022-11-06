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
1/ Count -total amount of data- Comes from server, load in the api
2/ How many data per page-10
3/Number of page=count/ data per page ---(Math.ceil(value):ceil the value because the fraction amount will show in a different page.)
4/ Identify the current page
5/Pagination visual format [...Array(3).keys()]
(3) [0, 1, 2]

*/
//-------------------------------------------------
const Shop = () => {
  //notE useState
  // const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  //workinG pagination
  // const { count, products } = useLoaderData(); // Count comes from api
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  //page e click korle current page change hobe. So clicked page/current page k akta state er moddhe rakhte hobe
  const [page, setPage] = useState(0);
  //Size of the page will be changed by dropdown menue
  const [size, setSize] = useState(10);
  const perPage = Math.ceil(count / size);

  //Load data and we will get count here
  useEffect(() => {
    const url = `http://localhost:5005/products?page=${page}&size=${size}`; //load korar somiy abar kisu information o backend e pathai dicchi query hisebe
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setProducts(data.products);
      });
  }, [page, size]);
  // pagination enD
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
    const savedCart = [];
    //workinG: side effect of pagination. When we load only 10 data per page then stored products are only checked between them and as a result stored card display changed for different page. So the solution is to load data according to the stored ID from the server. Interesting thing is we use post here to lead data here. In body we send the keys and tell the server to give us that key's regarding data. This data will be displayed in the cart. We usually use get method for load data but people usually cashed the get method to preserve the loaded data. So it is risky to use get method because load data related dependency changes frequently.
    const ids = Object.keys(storedCart);
    fetch("http://localhost:5005/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((data) => {
        for (const id in storedCart) {
          const addedProduct = data.find((product) => product._id === id);
          //?
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
  }, [products]);
  //click event handler
  const handleAddToCart = (selectedProduct) => {
    // console.log(selectedProduct);
    // console.log(cart);
    let newCart;
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

      {/*  workinG pagination */}
      <div>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Currently selected page: {page}, and size: {size}
        </p>
        <div className="pagination">
          {[...Array(perPage).keys()].map((number) => (
            <button
              onClick={() => setPage(number)}
              className={`page-number ${page === number && "selected-page"}`}
              key={number}
            >
              {number + 1}
            </button>
          ))}
          <select
            onChange={(event) => setSize(event.target.value)}
            name=""
            id=""
            defaultValue={10}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Shop;
