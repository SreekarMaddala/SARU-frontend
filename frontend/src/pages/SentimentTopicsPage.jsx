
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { fetchSentimentAnalysis, fetchTopics } from "../services/analyticsApi";

export default function SentimentTopicsPage() {
  const { token, logout } = useAuth();
  const [analyticsData, setAnalyticsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const fetchAnalytics = async (endpoint) => {
    try {
      const res = await fetch(`http://localhost:8000/analytics/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      return await res.json();
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      return { message: `Error loading ${endpoint}` };
    }
  };

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const [sentimentSamples, topicsTop] = await Promise.all([
          fetchSentimentAnalysis(),
          fetchTopics()
        ]);
        setAnalyticsData({
          sentiment_trend: sentimentSamples,
          topics_top: topicsTop
        });
      } catch (err) {
        setError("Failed to load analytics data");
        console.error("Error loading analytics:", err);
      }
      setLoading(false);
    };

    loadAnalytics();
  }, []);

  const renderSentimentAnalysis = () => {
    const data = analyticsData.sentiment_trend;
    if (!data || data.message)
      return (
        <p className="text-cyan-400 text-lg font-medium">
          {data?.message || "No data available"}
        </p>
      );

    // Prepare data for bar chart - sentiment analysis
    const sentimentData = data.sentiments?.map((item) => ({
      text: item.text,
      sentiment: item.sentiment,
      score: item.score
    })) || [];

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
          📈 Sentiment Trend
        </h3>

        {/* Sentiment List */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-black/40 backdrop-blur-lg border border-cyan-400/30 p-6 rounded-2xl shadow-lg"
        >
          <h4 className="text-xl font-semibold text-cyan-300 mb-4">Sentiment Analysis</h4>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {sentimentData.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                <div className="flex-1">
                  <p className="text-cyan-300 text-sm">{item.text}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.sentiment === 'positive' ? 'bg-green-500 text-white' :
                    item.sentiment === 'negative' ? 'bg-red-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {item.sentiment}
                  </span>
                  <span className="text-cyan-400 text-sm">{item.score?.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderTopicModeling = () => {
    const data = analyticsData.topics_top;
    if (!data || data.message)
      return (
        <p className="text-cyan-400 text-lg font-medium">
          {data?.message || "No data available"}
        </p>
      );

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-8"
      >
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
          🧠 Topic Modeling
        </h3>

        {/* Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.topics?.map((topic) => (
            <motion.div
              key={topic.topic_id}
              whileHover={{ scale: 1.05 }}
              className="bg-black/40 backdrop-blur-lg border border-purple-400/30 p-5 rounded-2xl shadow-lg hover:shadow-purple-400/20 transition-all"
            >
              <h4 className="text-lg font-semibold text-purple-300">
                Topic {topic.topic_id + 1}
              </h4>
              <ul className="text-cyan-300 mt-3 space-y-1">
                {topic.top_words?.map((word, idx) => (
                  <li key={idx} className="text-sm flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    {word}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 flex items-center justify-center">
        <div className="text-cyan-300 text-2xl animate-pulse">
          Loading analytics data...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-cyan-400/20 shadow-lg">
        <div className="flex justify-between items-center p-6">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo - Copy.png" alt="Logo" className="h-10" />
            <div>
              <h1 className="text-2xl font-bold text-cyan-400">SARU</h1>
              <p className="text-sm text-gray-400">feedback collector</p>
            </div>
          </Link>
          <div className="hidden md:flex space-x-8 items-center font-medium">
            <Link to="/dashboard" className="hover:text-cyan-300">
              Dashboard
            </Link>
            <Link to="/analytics" className="hover:text-cyan-300">
              Analytics
            </Link>
            <span className="text-purple-400">Sentiment & Topics</span>
            <Link to="/feedback-table" className="hover:text-cyan-300">
              Feedback
            </Link>
            <Link to="/customer-data" className="hover:text-cyan-300">
              Customers
            </Link>
            <Link to="/products" className="hover:text-cyan-300">
              Products
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-10"
      >
        <Link
          to="/analytics"
          className="text-cyan-400 hover:text-purple-300 transition duration-300 text-lg"
        >
          ← Back to Analytics Overview
        </Link>
        <h1 className="mt-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
          Sentiment & Topics Dashboard
        </h1>
        <p className="mt-4 text-gray-400 max-w-3xl">
          Dive deep into real-time feedback insights with modern visual
          analytics designed for a Gen Z aesthetic — bold, bright, and data-driven.
        </p>
      </motion.div>

      {/* Content */}
      <div className="p-10 space-y-16">
        {renderSentimentAnalysis()}
        {renderTopicModeling()}
      </div>
    </div>
  );
}
