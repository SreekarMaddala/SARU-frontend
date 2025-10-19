import axios from "axios";

// Create axios instance for users API
const usersApi = axios.create({
  baseURL: "http://localhost:8000",
});

// Request interceptor to add JWT token
usersApi.interceptors.request.use(
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
usersApi.interceptors.response.use(
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

// Users API functions
export const getUsers = async () => {
  const response = await usersApi.get("/customers/");
  return response.data;
};

export const createUser = async (userData) => {
  const response = await usersApi.post("/customers/", userData);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await usersApi.put(`/customers/${userId}/`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await usersApi.delete(`/customers/${userId}/`);
  return response.data;
};

export default usersApi;
