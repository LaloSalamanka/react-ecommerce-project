import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import { useState, useContext } from "react";


function Product({ product }) {
  // 購物車相關變數
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);  // 用來顯示提示訊息
    

  // 加入購物車功能
  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // 2秒後隱藏提示
  };

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to={`/products/${product.productId}`} >
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt={product.productName}
            src={product.imageUrl || Image} // 使用後端返回的 imageUrl
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center">{product.productName}</h5>
          <p className="card-text text-center">${product.price}</p>
          <div className="d-grid d-block">
            <button className="btn btn-outline-dark mt-3" onClick={handleAddToCart}>
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
            </button>
            {added && <p className="text-success mt-2">The item has been added!</p>} {/* 顯示提示 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
