import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import PageOne from './pages/PageOne';
import FeedbackTablePage from './pages/FeedbackTablePage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import CareersPage from './pages/CareersPage';
import SolutionsPage from './pages/SolutionsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

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
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PageOne />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/careers" element={<CareersPage />} />

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
    </AuthProvider>
  );
}

export default App;
