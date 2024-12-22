import React, { createContext, useState } from "react";
import { getProducts, getProductById } from "../service/ProductService";

// 創建 ProductContext
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(null);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.results);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchProductById = async (id) => {
    try {
      const data = await getProductById(id);
      setProductDetail(data);
    } catch (error) {
      console.error(`Failed to fetch product with id ${id}:`, error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, productDetail, fetchProducts, fetchProductById }}>
      {children}
    </ProductContext.Provider>
  );
};
