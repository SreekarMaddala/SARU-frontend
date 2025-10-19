import axios from "axios";

// Create axios instance for product API
const productApi = axios.create({
  baseURL: "http://localhost:8000",
});

// Request interceptor to add JWT token
productApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
productApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Product API functions
export const getProducts = async () => {
  const response = await productApi.get("/products");
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await productApi.post("/products", productData);
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await productApi.put(`/products/${productId}`, productData);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await productApi.delete(`/products/${productId}`);
  return response.data;
};

export default productApi;
