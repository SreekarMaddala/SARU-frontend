import axios from "axios";
import { BASE_URL } from "../../shared/api";

// Create axios instance for users API
const usersApi = axios.create({
  baseURL: BASE_URL,
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
  const response = await usersApi.get("/users/");
  const users = Array.isArray(response.data) ? response.data : [];

  // Normalize payload for backward compatibility across schema versions.
  return users.map((user) => ({
    id: user.id,
    name: user.name ?? null,
    email: user.email ?? null,
    mobile: user.mobile ?? null,
    created_at: user.created_at ?? null,
  }));
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


