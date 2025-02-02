import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import AuthService from "../services/AuthService";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [inputError, setInputError] = useState(false); // 錯誤狀態
  const [error, setError] = useState("");

  // 設定登入狀態
  const { setIsLoggedIn, setUser } = useContext(AuthContext); // 使用 Context
  const { loadCart, setCartItems } = useCart();

  // 處理輸入變更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setInputError(false); // 一旦用戶輸入，清除紅色邊框
    setError(""); // 清除錯誤訊息
  };

  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault(); // 阻止頁面刷新
    setError(""); // 清空錯誤訊息
    try {
      const data = await AuthService.login(formData);

      // 更新登入狀態
      if (data.loggedIn) {
        setIsLoggedIn(true);
        setUser(data.user);
        Cookies.set("currentUserId", data.user.userId, { expires: 7, path: '/' }); // 存儲用戶 ID 到 cookie

        // 加載用戶的購物車數據
        await loadCart(data.user.userId);

        // 合併未登入時本地存儲中的購物車數據
        const localCart = localStorage.getItem('cartItems');
        const parsedLocalCart = JSON.parse(localCart);
        if (parsedLocalCart.length > 0) {
          setCartItems(parsedLocalCart);
          localStorage.removeItem('cartItems'); // 清除本地存儲中的購物車數據
        }
        navigate("/"); // 導向至首頁
      } else {
        setIsLoggedIn(false);
        setError("Username or Password is incorrect.");
      }
    } catch (error) {
      console.log("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container py-3">
      <br />
      <br />
      <br />
      <div className="row my-4">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body px-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign In</h4>
              <form className="row g-2" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${inputError ? "is-invalid" : ""}`} // 錯誤時新增紅色邊框
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Password</label>
                  <input 
                    type="password"
                    className={`form-control ${inputError ? "is-invalid" : ""}`} // 錯誤時新增紅色邊框                    
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                </div>
                {error && <div className="text-danger">{error}</div>} {/* 顯示錯誤訊息 */}
                <div className="col-md-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={!formData.email || !formData.password} // 禁止空輸入的提交
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <hr className="text-muted my-0" />
            <div className="text-center p-3">
              Don&lsquo;t have an account?{" "}
              <Link to="/auth/sign-up" className="text-decoration-none fw-medium link-secondary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Login;