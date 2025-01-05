import { Link } from "react-router-dom";

function RelatedProduct({ product }) {
  return (
    <Link
      to={`/products/${product.productId}`}
      className="col text-decoration-none"
    >
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover"
          height="200"
          alt={product.productName}
          src={product.imageUrl || Image} // 使用後端返回的 imageUrl
        />
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {product.productName}
          </h5>
          <p className="card-text text-center text-muted">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default RelatedProduct;