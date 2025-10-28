import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AnalyticsPage() {
  const { token, logout } = useAuth();
  const [summaryData, setSummaryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const fetchSummaryData = async () => {
    try {
      const res = await fetch('http://localhost:8000/analytics/company_performance', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch summary data');
      return await res.json();
    } catch (err) {
      console.error('Error fetching summary data:', err);
      return { message: 'Error loading summary data' };
    }
  };

  useEffect(() => {
    const loadSummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSummaryData();
        setSummaryData(data);
      } catch (err) {
        setError('Failed to load analytics summary');
        console.error('Error loading summary:', err);
      }
      setLoading(false);
    };

    loadSummary();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-saru-black flex items-center justify-center">
        <div className="text-saru-cyan text-xl">Loading analytics summary...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-saru-black flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-saru-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark border-b border-saru-cyan/60 backdrop-blur-md shadow-lg">
        <div className="flex justify-between items-center p-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-4">
              <img src="/logo - Copy.png" alt="Logo" className="h-10" />
              <div>
                <h1 className="text-2xl font-bold text-saru-cyan">SARU</h1>
                <p className="text-sm text-saru-cyan/60">feedback collector</p>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/dashboard" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </Link>
            <span className="text-saru-teal font-semibold">Analytics</span>
            <Link to="/feedback-table" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
              Feedback Table
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </Link>
            <Link to="/customer-data" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
              Customer Data
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </Link>
            <Link to="/products" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </Link>
            <a href="#" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
          <button className="md:hidden text-saru-cyan">☰</button>
        </div>
      </nav>

      <div className="p-8 space-y-12">
        <h1 className="text-5xl font-bold text-saru-cyan mb-8">Analytics Overview</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30 text-center">
            <p className="text-4xl font-bold text-saru-cyan mb-2">{summaryData.total_feedback || 0}</p>
            <p className="text-saru-teal">Total Feedback</p>
          </div>
          <div className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30 text-center">
            <p className="text-4xl font-bold text-saru-cyan mb-2">{summaryData.avg_sentiment?.toFixed(2) || 'N/A'}</p>
            <p className="text-saru-teal">Average Sentiment</p>
          </div>
          <div className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30 text-center">
            <p className="text-4xl font-bold text-saru-cyan mb-2">{Object.keys(summaryData.topic_counts || {}).length}</p>
            <p className="text-saru-teal">Topics Identified</p>
          </div>
        </div>

        {/* Navigation Cards to Sub-Pages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/analytics/sentiment-topics" className="group">
            <div className="bg-saru-black p-8 rounded-lg border border-saru-cyan/30 hover:border-saru-cyan transition duration-300 group-hover:scale-105">
              <h3 className="text-2xl font-bold text-saru-cyan mb-4">Sentiment & Topics</h3>
              <p className="text-saru-teal mb-6">Analyze sentiment patterns and discover key topics in your feedback</p>
              <div className="text-saru-cyan font-semibold group-hover:text-saru-teal transition duration-300">
                Explore → →
              </div>
            </div>
          </Link>

          <Link to="/analytics/channel-user" className="group">
            <div className="bg-saru-black p-8 rounded-lg border border-saru-cyan/30 hover:border-saru-cyan transition duration-300 group-hover:scale-105">
              <h3 className="text-2xl font-bold text-saru-cyan mb-4">Channels & Users</h3>
              <p className="text-saru-teal mb-6">Understand feedback distribution across channels and user behavior</p>
              <div className="text-saru-cyan font-semibold group-hover:text-saru-teal transition duration-300">
                Explore → →
              </div>
            </div>
          </Link>

          <Link to="/analytics/performance-advanced" className="group">
            <div className="bg-saru-black p-8 rounded-lg border border-saru-cyan/30 hover:border-saru-cyan transition duration-300 group-hover:scale-105">
              <h3 className="text-2xl font-bold text-saru-cyan mb-4">Performance & Advanced</h3>
              <p className="text-saru-teal mb-6">Deep dive into performance metrics, temporal trends, and correlations</p>
              <div className="text-saru-cyan font-semibold group-hover:text-saru-teal transition duration-300">
                Explore → →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
