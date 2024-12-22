import { Link } from "react-router-dom";

/*
  這邊的 link 是經由 App.js 的路由設定，點擊會跑去 Product.detail
*/ 
function FeatureProduct({ product }) {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover"
          height="240"
          alt={product.productName}
          src={product.imageUrl}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{product.productName}</h5>
          <p className="card-text text-center text-muted">${product.price}</p>
          <div className="d-grid gap-2">
            <Link to={`/products/${product.productId}`} className="btn btn-outline-dark">
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;
