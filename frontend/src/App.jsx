import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import PageOne from './pages/PageOne';
import FeedbackTablePage from './pages/FeedbackTablePage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SentimentTopicsPage from './pages/SentimentTopicsPage';
import ChannelUserPage from './pages/ChannelUserPage';
import PerformanceAdvancedPage from './pages/PerformanceAdvancedPage';
import CustomerDataPage from './pages/CustomerDataPage';
import ProductsPage from './pages/ProductsPage';
import PricingPage from './pages/PricingPage';
import CareersPage from './pages/CareersPage';
import SolutionsPage from './pages/SolutionsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CompanyLoginPage from './pages/CompanyLoginPage';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-saru-black text-saru-cyan">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PageOne />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/company/login" element={<CompanyLoginPage />} />

        {/* Protected routes */}
        <Route
          path="/feedback-table"
          element={
            <ProtectedRoute>
              <FeedbackTablePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics/sentiment-topics"
          element={
            <ProtectedRoute>
              <SentimentTopicsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/channels-users"
          element={
            <ProtectedRoute>
              <ChannelUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics/performance-advanced"
          element={
            <ProtectedRoute>
              <PerformanceAdvancedPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-data"
          element={
            <ProtectedRoute>
              <CustomerDataPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProvider>
              <AdminDashboardPage />
            </AdminProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
