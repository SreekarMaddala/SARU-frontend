import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ChannelUserPage() {
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
        const endpoints = ['channels', 'users'];
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

  const renderChannelAnalysis = () => {
    const data = analyticsData.channels;
    if (!data || data.message) return <p className="text-saru-cyan">{data?.message || 'No data'}</p>;

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-saru-cyan">Channel Analysis</h3>
        <div className="bg-saru-black p-4 rounded-lg border border-saru-cyan/30">
          <h4 className="text-saru-teal font-semibold mb-4">Channel Counts</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(data.channel_counts || {}).map(([channel, count]) => (
              <div key={channel} className="text-center">
                <p className="text-2xl font-bold text-saru-cyan">{count}</p>
                <p className="text-saru-teal text-sm">{channel}</p>
              </div>
            ))}
          </div>
          <h4 className="text-saru-teal font-semibold mt-6 mb-4">Average Sentiment per Channel</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(data.avg_sentiment_per_channel || {}).map(([channel, avg]) => (
              <div key={channel} className="text-center">
                <p className="text-2xl font-bold text-saru-cyan">{avg?.toFixed(2)}</p>
                <p className="text-saru-teal text-sm">{channel}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderUserBehavior = () => {
    const data = analyticsData.users;
    if (!data || data.message) return <p className="text-saru-cyan">{data?.message || 'No data'}</p>;

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-saru-cyan">User Behavior Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-saru-black p-4 rounded-lg border border-saru-cyan/30">
            <h4 className="text-saru-teal font-semibold mb-4">User Feedback Frequency</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {Object.entries(data.user_feedback_frequency || {}).map(([user, freq]) => (
                <div key={user} className="flex justify-between">
                  <span className="text-saru-cyan">{user}</span>
                  <span className="text-saru-teal">{freq}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-saru-black p-4 rounded-lg border border-saru-cyan/30">
            <h4 className="text-saru-teal font-semibold mb-4">User Average Sentiment</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {Object.entries(data.user_avg_sentiment || {}).map(([user, avg]) => (
                <div key={user} className="flex justify-between">
                  <span className="text-saru-cyan">{user}</span>
                  <span className="text-saru-teal">{avg?.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-saru-black flex items-center justify-center">
        <div className="text-saru-cyan text-xl">Loading channels and users analytics...</div>
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
            <span className="text-saru-teal font-semibold">Channels & Users</span>
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
        <h1 className="text-5xl font-bold text-saru-cyan mb-8">Channels & Users Analysis</h1>

        <div className="space-y-12">
          {renderChannelAnalysis()}
          {renderUserBehavior()}
        </div>
      </div>
    </div>
  );
}
