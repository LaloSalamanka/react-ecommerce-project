import { Link } from "react-router-dom";
import Product from "./Product";
import ProductH from "./ProductH";
import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { ProductContext } from "../context/ProductContext";

const categories = [
  "All Products",
  "Phones & Tablets",
  "Cases & Covers",
  "Screen Guards",
  "Cables & Chargers",
  "Power Banks",
];

const brands = ["Apple", "Samsung", "Google", "HTC"];

const manufacturers = ["HOCO", "Nillkin", "Remax", "Baseus"];

// 左邊的篩選條件
function FilterMenuLeft() {
  return (
    <ul className="list-group list-group-flush rounded">
      <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-2">Browse</h5>
        <div className="d-flex flex-wrap my-2">
          {categories.map((v, i) => {
            return (
              <Link
                key={i}
                to="/products"
                className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                replace
              >
                {v}
              </Link>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-1">Brands</h5>
        <div className="d-flex flex-column">
          {brands.map((v, i) => {
            return (
              <div key={i} className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {v}
                </label>
              </div>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-1">Manufacturers</h5>
        <div className="d-flex flex-column">
          {manufacturers.map((v, i) => {
            return (
              <div key={i} className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {v}
                </label>
              </div>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Price Range</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Min"
              defaultValue="100000"
            />
            <label htmlFor="floatingInput">Min Price</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Max"
              defaultValue="500000"
            />
            <label htmlFor="floatingInput">Max Price</label>
          </div>
          <button className="btn btn-dark">Apply</button>
        </div>
      </li>
    </ul>
  );
}

// ProductList 元件
function ProductList() {
  const [viewType, setViewType] = useState({ grid: true });
  const { products, totalProducts, fetchProducts } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // 每頁顯示的商品數量

  useEffect(() => {
    const params = {
      limit: productsPerPage,
      offset: (currentPage - 1) * productsPerPage,
      orderBy: "created_date",
      sort: "desc",
    };
    fetchProducts(params);
  }, [currentPage, fetchProducts]);
  

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      {/* header 回 Product 首頁的連結 */}
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/products"
            >
              All Products
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Cases &amp; Covers
          </li>
        </ol>
      </nav>

      {/* 這一段是 for 小螢幕去看左邊的篩選條件 可以水平滑動 */}
      <div className="h-scroller d-block d-lg-none">
        <nav className="nav h-underline">
          {categories.map((v, i) => {
            return (
              <div key={i} className="h-link me-2">
                <Link
                  to="/products"
                  className="btn btn-sm btn-outline-dark rounded-pill"
                >
                  {v}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
      
      {/* 這一段也是 for 小螢幕去看左邊的篩選條件 下拉式選單選 Brands 那些的 */}
      <div className="row mb-3 d-block d-lg-none">
        <div className="col-12">
          <div id="accordionFilter" className="accordion shadow-sm">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button fw-bold collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFilter"
                  aria-expanded="false"
                  aria-controls="collapseFilter"
                >
                  Filter Products
                </button>
              </h2>
            </div>
            <div
              id="collapseFilter"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFilter"
            >
              <div className="accordion-body p-0">
                <FilterMenuLeft />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 這一段是普通螢幕上顯示的 All Models 下拉式選單、搜尋欄、跟改變 grid 的那個按鈕 */}
      <div className="row mb-4 mt-lg-3">
        <div className="d-none d-lg-block col-lg-3">
          <div className="border rounded shadow-sm">
            <FilterMenuLeft />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            <div className="row mb-3">
              <div className="col-lg-3 d-none d-lg-block">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue=""
                >
                  <option value="">All Models</option>
                  <option value="1">iPhone X</option>
                  <option value="2">iPhone Xs</option>
                  <option value="3">iPhone 11</option>
                </select>
              </div>
              <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search products..."
                    aria-label="search input"
                  />
                  <button className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </button>
                </div>
                <button
                  className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                  onClick={changeViewType}
                >
                  <FontAwesomeIcon
                    icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                  />
                </button>
              </div>
            </div>

             {/* 這一段是呈現商品內容的地方 */}
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
              }
            >
              {products.length > 0 ? (
              // 如果 viewType 為 true, 顯示 Product.js, 否則顯示 ProductH.js
              Array.from({ length: products.length }, (_, i) => {
                const product = products[i]; // 取得對應的產品資料
                // 設置折扣，這裡您可以根據需要來設定折扣
                const percentOff = product.percentOff || (i % 2 === 0 ? 15 : null);
                if (viewType.grid) {
                  return (
                    <Product key={product.productId} product={product} percentOff={percentOff} />
                  );
                }
                return (
                  <ProductH key={product.productId} product={product} percentOff={percentOff} />
                );
              })) : (<p>Loading...</p>)}
            </div>

            {/* 這一段是顯示頁數的地方 */}
            <div className="d-flex align-items-center mt-auto">
              <span className="text-muted small d-none d-md-inline">
                Showing {currentPage * productsPerPage - productsPerPage + 1} to {Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts}
              </span>
              <nav aria-label="Page navigation example" className="ms-auto">
                <ul className="pagination my-0">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages).keys()].map(number => (
                    <li key={number + 1} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
                      <button onClick={() => paginate(number + 1)} className="page-link">
                        {number + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;