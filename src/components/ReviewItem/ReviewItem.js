import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import "./ReviewItem.css";
const ReviewItem = ({ product, handleRemoveItems }) => {
  const { id, img, name, price, shipping, quantity, stock, category } = product;
  return (
    <div className="review-item">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="review-details-container">
        <div className="review-details">
          <p>{name}</p>
          <small>
            <p>Price: ${price}</p>
          </small>
          <small>
            <p>Shipping Charge:${shipping}</p>
          </small>
          <small>
            <p>Quantity Charge: {quantity}</p>
          </small>
        </div>
        <div className="delete-container" onClick={() => handleRemoveItems(id)}>
          <button className="btn-delete">
            <FontAwesomeIcon
              className="delete-icon"
              icon={faTrashAlt}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
