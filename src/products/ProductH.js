import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function ProductH({ product }) {
    return (
    <div className="col">
      <div className="card shadow-sm">
      <Link to={`/products/${product.productId}`} replace>
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
            <button className="btn btn-outline-dark mt-3">
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductH;
