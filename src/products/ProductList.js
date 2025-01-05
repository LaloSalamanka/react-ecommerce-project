import { Link } from "react-router-dom";
import Product from "./Product";
import ProductH from "./ProductH";
import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { ProductContext } from "../context/ProductContext";


const categories = {
  "All Products": "",
  "T-Shirts": "T_SHIRT",
  "Pants": "PANTS",
  "Jackets": "JACKET",
};


// 左邊的篩選條件
function FilterMenuLeft({setSelectedCategory} ) {

  
  
  
  return (
    <ul className="list-group list-group-flush rounded">
      <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-3 px-5">Browse</h5>
        <div className="d-flex flex-column justify-content-center my-2">
        {Object.keys(categories).map((key, i) => {
            return (
              <button
                key={i}
                onClick={() => setSelectedCategory(categories[key])} // 更新選中的 category
                className="btn btn-sm btn-outline-dark rounded-pill me-4 mb-2 "
              >
                {key}
              </button>
            );
          })}
        </div>
      </li>
    </ul>
  );
}

// ProductList 元件
function ProductList() {

  // 分類相關變數
  const [selectedCategory, setSelectedCategory] = useState(null); // 管理選中的 category

  const [viewType, setViewType] = useState({ grid: true });
  const { products, totalProducts, fetchProducts } = useContext(ProductContext);

  // 頁面相關變數
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // 每頁顯示的商品數量

  // 搜尋框相關變數
  const [searchQuery, setSearchQuery] = useState(""); // 搜尋框輸入值
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery); // 防抖輸入值

  


  // 防抖
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery); // 延遲更新搜尋值
    }, 500); // 延遲 500 毫秒

    return () => clearTimeout(handler); // 清除上次延遲
  }, [searchQuery]);


  useEffect(() => {
    const params = {
      category: selectedCategory,
      limit: productsPerPage,
      offset: (currentPage - 1) * productsPerPage,
      orderBy: "created_date",
      sort: "desc",
      search: debouncedQuery || undefined, // 搜尋關鍵字參數
    };
    fetchProducts(params);
  }, [currentPage, fetchProducts, debouncedQuery, selectedCategory]);
  

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
          {/* <li className="breadcrumb-item active" aria-current="page">
            Cases &amp; Covers
          </li> */}
        </ol>
      </nav>

      {/* 這一段是 for 小螢幕去看左邊的篩選條件 可以水平滑動 */}
      <div className="h-scroller d-block d-lg-none" style={{ marginTop: '15px' }}>
        <nav className="nav h-underline">
        {Object.keys(categories).map((key, i) => {
            return (
              <button
                key={i}
                onClick={() => setSelectedCategory(categories[key])} // 更新選中的 category
                className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
              >
                {key}
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* 這一段是普通螢幕上顯示的 All Models 下拉式選單、搜尋欄、跟改變 grid 的那個按鈕 */}
      <div className="row mb-4 mt-lg-3">
        <div className="d-none d-lg-block col-lg-3">
          <div className="border rounded shadow-sm">
            <FilterMenuLeft setSelectedCategory={setSelectedCategory} />
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // 更新搜尋值
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
                // const percentOff = product.percentOff || (i % 2 === 0 ? 15 : null);
                if (viewType.grid) {
                  return (
                    <Product key={product.productId} product={product}  />
                  );
                }
                return (
                  <ProductH key={product.productId} product={product}  />
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