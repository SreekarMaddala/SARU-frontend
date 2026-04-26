import axios from "axios";
import { BASE_URL } from "../../shared/api";

// Create axios instance for product API
const productApi = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to add JWT token
productApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("companyToken");
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
      localStorage.removeItem("companyToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Product API functions
export const getProducts = async () => {
  const response = await productApi.get("/products/");
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await productApi.post("/products/", productData);
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await productApi.put(`/products/${productId}/`, productData);
  return response.data;
};

export const deleteProduct = async (productId) => {
  try {
    const response = await productApi.delete(`/products/${productId}/`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data || {};
      const message =
        data.detail || data.message || `Request failed with status ${status}`;
      const err = new Error(message);
      err.status = status;
      err.data = data;
      throw err;
    }
    throw new Error("Network error. Please check your connection.");
  }
};

export default productApi;
