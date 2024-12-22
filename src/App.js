import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Cart from "./shopping-cart/Cart";
import Checkout from "./shopping-cart/Checkout";
import { ProductProvider } from "./context/ProductContext"; // 引入 ProductProvider
import { CartProvider } from "./context/CartContext";


function App() {
  return (
    /* 
      當 URL 匹配 /products 時，顯示 ProductList 組件。 
      當 URL 匹配根路徑 / 時，顯示 Landing 組件，即網站的首頁。
    */ 
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Template>
            <Routes>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
              <Route path="/products" element={<ProductList />} /> 
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/" element={<Landing />} />
            </Routes>
          </Template>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
