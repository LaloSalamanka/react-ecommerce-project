import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = (userId) => {
    // 從 localStorage 載入特定用戶的購物車資料
    const savedCart = localStorage.getItem(`cartItems_${userId}`);
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  };

  const saveCart = (userId) => {
    // 將購物車資料存入 localStorage
    localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
  };

  useEffect(() => {
    // 當購物車更新時，自動保存
    const userId = localStorage.getItem("currentUserId"); // 當前用戶 ID
    if (userId) {
      saveCart(userId);
    }
  }, [cartItems]);

  useEffect(() => {
    // 組件掛載時加載購物車
    const userId = localStorage.getItem("currentUserId"); // 當前用戶 ID
    if (userId) {
      loadCart(userId);
    }
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);