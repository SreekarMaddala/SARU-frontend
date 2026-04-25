import axios from "axios";

const BASE_URL = "http://localhost:8000";

/**
 * Create an axios instance with auth interceptors
 * @param {string} tokenKey - localStorage key for the token (e.g. 'companyToken', 'admin_token')
 * @param {string} loginPath - redirect path on 401 (e.g. '/', '/admin/login')
 */
export function createApiInstance(tokenKey, loginPath = "/") {
  const instance = axios.create({
    baseURL: BASE_URL,
  });

  // Request interceptor: attach JWT token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(tokenKey);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor: handle 401 token expiration
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem(tokenKey);
        window.location.href = loginPath;
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

// Pre-configured instances for common use cases
export const companyApi = createApiInstance("companyToken", "/");
export const adminApi = createApiInstance("admin_token", "/admin/login");

export default companyApi;

