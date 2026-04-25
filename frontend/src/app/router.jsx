import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context';
import { AdminProvider } from '../features/companies/context';

import PageOne from '../features/landing/pages/PageOne';
import FeedbackTablePage from '../features/feedback/pages/FeedbackTablePage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import AnalyticsOverviewPage from '../features/analytics/pages/AnalyticsOverviewPage';
import AIInsightsPage from '../features/analytics/pages/AIInsightsPage';
import UsersAnalyticsPage from '../features/analytics/pages/UsersAnalyticsPage';
import CompanyPerformancePage from '../features/companies/pages/CompanyPerformancePage';
import ProductsAnalyticsPage from '../features/analytics/pages/ProductsAnalyticsPage';
import TemporalAnalyticsPage from '../features/analytics/pages/TemporalAnalyticsPage';
import CustomerDataPage from '../features/customers/pages/CustomerDataPage';
import ProductsPage from '../features/products/pages/ProductsPage';
import PricingPage from '../features/landing/pages/PricingPage';
import CareersPage from '../features/landing/pages/CareersPage';
import SolutionsPage from '../features/landing/pages/SolutionsPage';
import AdminLoginPage from '../features/auth/pages/AdminLoginPage';
import AdminDashboardPage from '../features/companies/pages/AdminDashboardPage';
import CompanyLoginPage from '../features/auth/pages/CompanyLoginPage';

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

export default function AppRouter() {
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
          path="/feedback"
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
              <AnalyticsOverviewPage />
            </ProtectedRoute>
          }
        >
          <Route path="users" element={<UsersAnalyticsPage />} />
          <Route path="company-performance" element={<CompanyPerformancePage />} />
          <Route path="products" element={<ProductsAnalyticsPage />} />
          <Route path="temporal" element={<TemporalAnalyticsPage />} />
        </Route>
        <Route
          path="/analytics/ai-insights"
          element={
            <ProtectedRoute>
              <AIInsightsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
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
        <Route
          path="/admin/login"
          element={
            <AdminProvider>
              <AdminLoginPage />
            </AdminProvider>
          }
        />
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
