import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "../nillkin-case-1.jpg"; // 預設圖片

function Product({ product, percentOff }) {
  const price = product.price || 10000; // 假設 price 是從後端資料中來的
  let offPrice = `${price}Ks`; // 默認價格

  // 計算折扣價格
  if (percentOff > 0) {
    offPrice = (
      <>
        <del>{price}Ks</del> {price - (percentOff * price) / 100}Ks
      </>
    );
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to={`/products/${product.productId}`} >
          {percentOff > 0 && (
            <div
              className="badge bg-dim py-2 text-white position-absolute"
              style={{ top: "0.5rem", right: "0.5rem" }}
            >
              {percentOff}% OFF
            </div>
          )}
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt={product.productName}
            src={product.imageUrl || Image} // 使用後端返回的 imageUrl
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center">{product.productName}</h5>
          <p className="card-text text-center">{offPrice}</p>
          <div className="d-grid d-block">
            <button className="btn btn-outline-dark mt-3">
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
