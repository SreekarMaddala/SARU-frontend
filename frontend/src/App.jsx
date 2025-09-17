import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PageOne from './pages/PageOne';
import FeedbackTablePage from './pages/FeedbackTablePage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import CareersPage from './pages/CareersPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-saru-black text-saru-cyan">Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PageOne />} />
          <Route path="/feedback-table" element={<ProtectedRoute><FeedbackTablePage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
