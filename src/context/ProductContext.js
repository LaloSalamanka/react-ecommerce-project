import React, { createContext, useState } from "react";
import { getProducts, getProductById } from "../services/ProductService";

// 創建 ProductContext
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async (params) => {
    try {
      const data = await getProducts(params);
      setProducts(data.results);
      setTotalProducts(data.total);
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
    <ProductContext.Provider value={{ products, productDetail, totalProducts, fetchProducts, fetchProductById }}>
      {children}
    </ProductContext.Provider>
  );
};