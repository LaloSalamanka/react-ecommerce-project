import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { faTshirt } from '@fortawesome/free-solid-svg-icons'; // 引入 faTshirt


function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);

  // 登入狀態的變數
  const { isLoggedIn, user, logout } = useAuth(); // 使用 logout 取代手動設置

  // 購物車數量的變數
  const { cartItems, loadCart } = useCart();
  const navigate = useNavigate();

  // 計算購物車中所有商品的 quantity 加總
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    if (userId) {
      loadCart(userId);
    }
  }, []);

  // 登出功能
  const handleLogout = () => {
    logout(); // 呼叫 AuthContext 的 logout 函數
    navigate("/"); // 導向至首頁
    changeNav(); // 關閉展開的導航欄
  };

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav() {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>
            <FontAwesomeIcon
              icon={faTshirt}
              className="ms-1"
              size="lg"
            />
            <span className="ms-2 h5">Shop</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleDrawer}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={"collapse navbar-collapse " + (openedDrawer ? "show" : "")} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link" onClick={changeNav}>
                  Explore
                </Link>
              </li>
            </ul>

            {/* 購物車位置 */}
            <button
              type="button"
              className="btn btn-outline-dark me-3 d-none d-lg-inline"
              onClick={() => {
                navigate("/cart");
                changeNav();
              }}
            >
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">{totalQuantity}</span>
            </button>

            {isLoggedIn ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="userMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={["fas", "user-alt"]} className="me-2" />
                  <span>Welcome, {user?.firstName || "User"}!</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuButton">
                  <li>
                    <Link className="dropdown-item" to="/my-orders" onClick={changeNav}>
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <ul className="navbar-nav d-flex align-items-center">
                <li>
                  <Link to="/auth/login" className="btn btn-primary me-2" onClick={changeNav}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/auth/sign-up" className="btn btn-success" onClick={changeNav}>
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* 購物車位置 */}
          <div className="d-inline-block d-lg-none">
            <button type="button" className="btn btn-outline-dark" onClick={() => {
              navigate("/cart");
              changeNav();
            }}>
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">{totalQuantity}</span>
            </button>
            
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;