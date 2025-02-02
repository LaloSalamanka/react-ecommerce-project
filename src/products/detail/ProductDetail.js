import RelatedProduct from "./RelatedProduct";
import Ratings from "react-ratings-declarative";
import { Link, useParams, useNavigate  } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import React, { useEffect, useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";


const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

function ProductDetail() {
  function changeRating(newRating) {}

  // 商品相關變數
  const { id } = useParams(); 
  const { products, productDetail, fetchProductById, fetchProducts } = useContext(ProductContext); 
  // 購物車相關變數
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);  // 用來顯示提示訊息

  const navigate = useNavigate();  // 使用 useNavigate 進行頁面跳轉
  const {isLoggedIn} = useAuth();
  

  

  // 從後端 fetch 商品資料
  useEffect(() => {
    fetchProductById(id); 
    if (products.length === 0) {
      fetchProducts(); // 只有在 products 為空時才 fetch
    }
  }, [id, fetchProductById, fetchProducts, products.length]);

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  // 加入購物車功能
  const handleAddToCart = () => {
    addToCart(productDetail);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // 2秒後隱藏提示
  };

  // Buy Now 功能
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      // 如果用戶未登入，跳轉至登入頁面
      navigate("/auth/login");  // 假設登入頁面的路徑是 /login
    } else {
      addToCart(productDetail);  // 先將商品加入購物車
      navigate("/checkout");  // 跳轉到結帳頁面
    }
  };
  

  return (
    // breadcrumb 是 header 下顯示的上層頁面導航
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount/>
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/products">
              All Products
            </Link>
          </li>
          {/* <li className="breadcrumb-item">
            <a className="text-decoration-none link-secondary" href="!#">
              Cases &amp; Covers
            </a>
          </li> */}
          <li className="breadcrumb-item active" aria-current="page">
            {productDetail.productName}
          </li>
        </ol>
      </nav>
      <div className="row mb-4">
        {/* <div className="d-none d-lg-block col-lg-1">
          <div className="image-vertical-scroller">
            <div className="d-flex flex-column">
              {Array.from({ length: 10 }, (_, i) => {
                let selected = i !== 1 ? "opacity-6" : "";
                return (
                  <a key={i} href="!#">
                    <img
                      className={"rounded mb-2 ratio " + selected}
                      alt=""
                      src={productDetail.imageUrl}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div> */}
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
              <img
                className="border rounded ratio ratio-1x1"
                alt=""
                src={productDetail.imageUrl}
              />
            </div>
          </div>
        </div>

        {/* 商品 Detail 的位置 */}
        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h2 className="mb-1">{productDetail.productName}</h2>
            <h4 className="text-muted mb-4">${productDetail.price}</h4>

            <div className="row g-3 mb-4">
              <div className="col">
                <button className="btn btn-outline-dark py-2 w-100" onClick={handleAddToCart}>
                  Add to cart
                </button>
                {added && <p className="text-success mt-2">The item has been added!</p>} {/* 顯示提示 */}
              </div>
              <div className="col">
                <button className="btn btn-dark py-2 w-100" onClick={handleBuyNow}>Buy now</button>
              </div>
            </div>

            <h4 className="mb-0">Details</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Category</dt>
              <dd className="col-sm-8 mb-3">{productDetail.category}</dd>

              <dt className="col-sm-4">Status</dt>
              <dd className="col-sm-8 mb-3">Instock</dd>

              <dt className="col-sm-4">Rating</dt>
              <dd className="col-sm-8 mb-3">
                <Ratings
                  rating={4.5}
                  widgetRatedColors="rgb(253, 204, 13)"
                  changeRating={changeRating}
                  widgetSpacings="2px"
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    return (
                      <Ratings.Widget
                        key={i}
                        widgetDimension="20px"
                        svgIconViewBox="0 0 19 20"
                        svgIconPath={iconPath}
                        widgetHoverColor="rgb(253, 204, 13)"
                      />
                    );
                  })}
                </Ratings>
              </dd>
            </dl>

            <h4 className="mb-0">Description</h4>
            <hr />
            <p className="lead flex-shrink-0">
              <small>
              {productDetail.description}
              </small>
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Related products</h4>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
          {products && products.length > 0 ? (
            products
              .filter(product => product.productId !== productDetail.productId && product.category === productDetail.category) // 過濾掉與當前產品相同的產品
              .slice(0, 4) 
              .map(product => (
                <RelatedProduct key={product.productId} product={product} />
              ))
          ) : (
            <p className="text-center">No related products available.</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;