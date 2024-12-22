import axios from "axios";

const BASE_URL = "http://localhost:8080/products";

export const getProducts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
