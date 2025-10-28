import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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
        const endpoints = ['sentiment', 'topics'];
        const results = await Promise.all(endpoints.map(fetchAnalytics));
        const data = {};
        endpoints.forEach((endpoint, index) => {
          data[endpoint] = results[index];
        });
        setAnalyticsData(data);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error('Error loading analytics:', err);
      }
      setLoading(false);
    };

    loadAnalytics();
  }, [token]);

  const renderSentimentAnalysis = () => {
    const data = analyticsData.sentiment;
    if (!data || data.message) return <p className="text-saru-cyan">{data?.message || 'No data'}</p>;

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-saru-cyan">Sentiment Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.sentiments?.map((item, index) => (
            <div key={index} className="bg-saru-black p-4 rounded-lg border border-saru-cyan/30">
              <p className="text-sm text-saru-teal mb-2">{item.text.substring(0, 100)}...</p>
              <p className="text-saru-cyan font-semibold">Sentiment: {item.sentiment}</p>
              <p className="text-saru-teal">Score: {item.score?.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTopicModeling = () => {
    const data = analyticsData.topics;
    if (!data || data.message) return <p className="text-saru-cyan">{data?.message || 'No data'}</p>;

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-saru-cyan">Topic Modeling</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.topics?.map((topic) => (
            <div key={topic.topic_id} className="bg-saru-black p-4 rounded-lg border border-saru-cyan/30">
              <h4 className="text-saru-teal font-semibold">Topic {topic.topic_id + 1}</h4>
              <ul className="text-saru-cyan mt-2">
                {topic.top_words?.map((word, idx) => (
                  <li key={idx} className="text-sm">• {word}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-saru-black flex items-center justify-center">
        <div className="text-saru-cyan text-xl">Loading sentiment and topics analytics...</div>
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
            <Link to="/analytics" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
              Analytics
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </Link>
            <span className="text-saru-teal font-semibold">Sentiment & Topics</span>
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
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/analytics" className="text-saru-cyan hover:text-saru-teal transition duration-300">
            ← Back to Analytics Overview
          </Link>
        </div>
        <h1 className="text-5xl font-bold text-saru-cyan mb-8">Sentiment & Topics Analysis</h1>

        <div className="space-y-12">
          {renderSentimentAnalysis()}
          {renderTopicModeling()}
        </div>
      </div>
    </div>
  );
}
