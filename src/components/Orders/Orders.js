import React from "react";
import { useLoaderData } from "react-router-dom";

const Orders = () => {
  const products = useLoaderData();
  // console.log(products);
  return (
    <div>
      <h1>From orders component.</h1>
    </div>
  );
};

export default Orders;
