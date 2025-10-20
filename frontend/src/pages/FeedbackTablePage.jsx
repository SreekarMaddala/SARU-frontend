import { Link } from "react-router-dom";
import FeedbackTable from "../components/FeedbackTable";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function FeedbackTablePage() {
  const { token } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Set Page Title
  useEffect(() => {
    document.title = "Feedback Table | SARU";
  }, []);

  // ✅ Fetch Feedback Data
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch("http://localhost:8000/feedback", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch feedback data.");
        }

        const data = await res.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setErrorMsg("Failed to load feedback. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ==============================
          NAVIGATION BAR
      ============================== */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark border-b border-saru-cyan/60 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center space-x-4">
            <img src="/logo - Copy.png" alt="SARU Logo" className="h-10" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">SARU</h1>
              <p className="text-xs text-gray-500 tracking-wide">
                Feedback Collector
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 font-medium">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-blue-600 font-semibold border-b-2 border-blue-600">
              Feedback Table
            </span>
            <Link
              to="/customer-data"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Customer Data
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Products
            </Link>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-inner">
            <div className="flex flex-col space-y-3 px-6 py-4 font-medium">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-blue-600 font-semibold">
                Feedback Table
              </span>
              <Link
                to="/customer-data"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Customer Data
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Products
              </Link>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ==============================
          MAIN CONTENT
      ============================== */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
            📋 Feedback Table
          </h1>
          <p className="mt-2 text-gray-600">
            Review and analyze all customer feedback in one place.
          </p>
        </header>

        {/* Error Message */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {errorMsg}
          </div>
        )}

        {/* Feedback Table Section */}
        <div className="bg-white rounded-2xl shadow p-6">
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading feedback...</p>
          ) : feedbacks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No feedback found.</p>
          ) : (
            <FeedbackTable feedbacks={feedbacks} />
          )}
        </div>
      </main>
    </div>
  );
}
