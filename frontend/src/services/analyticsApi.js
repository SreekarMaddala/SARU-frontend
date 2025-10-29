
import axios from "axios";

// Create axios instance for analytics API
const analyticsApi = axios.create({
  baseURL: "http://localhost:8000",
});

// Request interceptor to add JWT token
analyticsApi.interceptors.request.use(
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
analyticsApi.interceptors.response.use(
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

// Analytics API functions
export const fetchSentimentSummary = async () => {
  const response = await analyticsApi.get("/analytics/sentiment_summary");
  return response.data;
};

export const fetchSentimentSamples = async (limit = 20) => {
  const response = await analyticsApi.get(`/analytics/sentiment_samples?limit=${limit}`);
  return response.data;
};

export const fetchChannels = async () => {
  const response = await analyticsApi.get("/analytics/channels");
  return response.data;
};

export const fetchProducts = async () => {
  const response = await analyticsApi.get("/analytics/products");
  return response.data;
};

export const fetchTopics = async () => {
  const response = await analyticsApi.get("/analytics/topics");
  return response.data;
};

export const fetchAnalyticsSummary = async () => {
  const response = await analyticsApi.get("/analytics/summary");
  return response.data;
};

export const fetchUserBehavior = async () => {
  const response = await analyticsApi.get("/analytics/users");
  return response.data;
};

export const fetchCompanyPerformance = async () => {
  const response = await analyticsApi.get("/analytics/company_performance");
  return response.data;
};

export const fetchTemporal = async () => {
  const response = await analyticsApi.get("/analytics/temporal");
  return response.data;
};

export const fetchCorrelation = async () => {
  const response = await analyticsApi.get("/analytics/correlation");
  return response.data;
};

export const fetchSentimentAnalysis = async () => {
  const response = await analyticsApi.get("/analytics/sentiment");
  return response.data;
};

export default analyticsApi;
