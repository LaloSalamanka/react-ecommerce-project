import React, { useState, useEffect, createContext, useContext } from 'react';
import Cookies from 'js-cookie';
import { useCart } from "./CartContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { setCartItems, loadCart } = useCart(); // 從 CartContext 中獲取 setCartItems 和 loadCart 函數

  // 初始化時從 cookie 載入資料
  useEffect(() => {
    const savedLoginState = Cookies.get("isLoggedIn");
    const savedUser = Cookies.get("user");

    if (savedLoginState === "true") {
      setIsLoggedIn(true);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 每當狀態變更時，同步到 cookie
  useEffect(() => {
    Cookies.set("isLoggedIn", isLoggedIn ? "true" : "false", { expires: 7, path: '/' });
    if (user) {
      Cookies.set("user", JSON.stringify(user), { expires: 7, path: '/' });
      Cookies.set("currentUserId", user.userId, { expires: 7, path: '/' }); // 儲存當前用戶 ID
    } else {
      Cookies.remove("user", { path: '/' });
      Cookies.remove("currentUserId", { path: '/' });
    }
  }, [isLoggedIn, user]);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    Cookies.set("isLoggedIn", "true", { expires: 7, path: '/' });
    Cookies.set("user", JSON.stringify(userData), { expires: 7, path: '/' });
    Cookies.set("currentUserId", userData.userId, { expires: 7, path: '/' }); // 儲存當前用戶 ID

    // 加載用戶的購物車數據
    loadCart(userData.userId);
  };

  const logout = () => {
    setCartItems([]);  // 清空購物車資料
    setIsLoggedIn(false);  // 清除用戶資料
    setUser(null);
    Cookies.remove("isLoggedIn", { path: '/' });
    Cookies.remove("user", { path: '/' });
    Cookies.remove("currentUserId", { path: '/' });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, setIsLoggedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);