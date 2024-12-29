import React, { useState, useEffect, createContext, useContext } from 'react';
import Cookies from 'js-cookie';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // 嘗試從 cookie 中加載購物車數據
    const userId = Cookies.get("currentUserId");
    if (userId) {
      const savedCart = Cookies.get(`cartItems_${userId}`);
      return savedCart ? JSON.parse(savedCart) : [];
    }
    // 如果沒有用戶 ID，嘗試從本地存儲中加載購物車數據
    const localCart = localStorage.getItem('cartItems');
    return localCart ? JSON.parse(localCart) : [];
  });

  const loadCart = (userId) => {
    if (!userId){return; }
    // 從 cookie 載入特定用戶的購物車資料
    const savedCart = Cookies.get(`cartItems_${userId}`);
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  };

  const saveCart = (userId) => {
    if (!userId) {
      // 如果 userId 不存在，將購物車資料存入本地存儲
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return;
    }
    // 將購物車資料存入 cookie
    Cookies.set(`cartItems_${userId}`, JSON.stringify(cartItems), { expires: 7, path: '/' });
  };

  useEffect(() => {
    // 當購物車更新時，自動保存
    const userId = Cookies.get("currentUserId"); // 當前用戶 ID
    saveCart(userId);
  }, [cartItems]);

  useEffect(() => {
    // 組件掛載時加載購物車
    const userId = Cookies.get("currentUserId"); // 當前用戶 ID
    if (userId) {
      loadCart(userId);
    }
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.productId === product.productId);
      if (existingItem) {
        return prevItems.map(item =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, loadCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);