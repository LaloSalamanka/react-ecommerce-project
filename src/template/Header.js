import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

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
  };

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav(event) {
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
              icon={["fab", "bootstrap"]}
              className="ms-1"
              size="lg"
            />
            <span className="ms-2 h5">Shop</span>
          </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? "open" : "")}>
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link" onClick={changeNav}>
                  Explore
                </Link>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <Link to="/my-orders" className="nav-link" onClick={changeNav}>
                    My Orders
                  </Link>
                </li>
              )}
            </ul>

            {/* 購物車位置 */}
            <button
              type="button"
              className="btn btn-outline-dark me-3 d-none d-lg-inline"
              onClick={() => navigate("/cart")}
            >
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">{totalQuantity}</span>
            </button>

            {isLoggedIn ? (
              <div className="d-flex align-items-center">
                <span className="me-3">Welcome, {user?.firstName || "User"}!</span>
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <ul className="navbar-nav d-flex align-items-center">
                <li>
                  <Link to="/auth/login" className="btn btn-primary me-2">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/auth/sign-up" className="btn btn-success">
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* 購物車位置 */}
          <div className="d-inline-block d-lg-none">
            <button type="button" className="btn btn-outline-dark">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">{totalQuantity}</span>
            </button>
            <button
              className="navbar-toggler p-0 border-0 ms-3"
              type="button"
              onClick={toggleDrawer}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;