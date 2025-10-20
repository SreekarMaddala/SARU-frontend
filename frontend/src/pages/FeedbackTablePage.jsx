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

  useEffect(() => {
    document.title = "Feedback Table | SARU";
  }, []);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* ==============================
          NAVIGATION BAR
      ============================== */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark border-b border-saru-cyan/60 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo - Copy.png" alt="SARU Logo" className="h-10 w-10" />
            <div>
              <h1 className="text-2xl font-bold text-white">SARU</h1>
              <p className="text-xs text-gray-100 tracking-wide">
                Feedback Collector
              </p>
            </div>
          </Link>

          <div className="hidden md:flex space-x-8 font-medium text-white">
            <Link
              to="/dashboard"
              className="hover:text-yellow-200 transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-yellow-200 font-semibold border-b-2 border-yellow-200">
              Feedback Table
            </span>
            <Link
              to="/customer-data"
              className="hover:text-yellow-200 transition-colors"
            >
              Customer Data
            </Link>
            <Link
              to="/products"
              className="hover:text-yellow-200 transition-colors"
            >
              Products
            </Link>
            <a href="#" className="hover:text-yellow-200 transition-colors">
              About
            </a>
          </div>

          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

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
          MAIN CONTENT - Adjusted padding and removed header
      ============================== */}
      {/* Adjusted `px-6` to responsive `px-4 sm:px-6` for better 
        mobile screen utilization to fit the table.
      */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Removed the <header> tag and its contents */}

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-center md:text-left">
            {errorMsg}
          </div>
        )}

        {/* Feedback Table Section - uses overflow-x-auto to ensure scrollability */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          {loading ? (
            <p className="text-gray-500 text-center py-8 animate-pulse">
              Loading feedback...
            </p>
          ) : feedbacks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No feedback found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <FeedbackTable feedbacks={feedbacks} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} SARU Feedback System. All rights reserved.
      </footer>
    </div>
  );
}