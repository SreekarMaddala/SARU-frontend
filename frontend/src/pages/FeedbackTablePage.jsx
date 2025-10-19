import { Link } from "react-router-dom";
import FeedbackTable from "../components/FeedbackTable";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function FeedbackTablePage() {
  const { token } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch("http://localhost:8000/feedback", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark border-b border-saru-cyan/60 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center space-x-6">
            <img src="/logo - Copy.png" alt="SARU Logo" className="h-10" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">SARU</h1>
              <p className="text-xs text-gray-500 tracking-wide">Feedback Collector</p>
            </div>
          </Link>

          {/* Navigation Links */}
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
          <button className="md:hidden text-gray-700">☰</button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            📋 Feedback Table
          </h1>
          <p className="mt-2 text-gray-600">
            Review and analyze all customer feedback in one place.
          </p>
        </header>

        {/* Feedback Table */}
        <div className="bg-white rounded-2xl shadow p-6">
          <FeedbackTable feedbacks={feedbacks} />
        </div>
      </main>
    </div>
  );
}
