import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchCompanyPerformance } from '../services/analyticsApi';

export default function CompanyPerformancePage() {
  const { token } = useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchCompanyPerformance();
        setData(result);
      } catch (err) {
        setError('Failed to load company performance');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-saru-cyan mb-6">Company Performance Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30 text-center">
          <p className="text-4xl font-bold text-saru-cyan mb-2">{data.total_feedback}</p>
          <p className="text-saru-teal">Total Feedback</p>
        </div>
        <div className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30 text-center">
          <p className="text-4xl font-bold text-green-400 mb-2">{data.avg_sentiment?.toFixed(2)}</p>
          <p className="text-saru-teal">Avg Sentiment</p>
        </div>
        <div className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30 text-center">
          <p className="text-4xl font-bold text-blue-400 mb-2">{data.total_topics}</p>
          <p className="text-saru-teal">Total Topics</p>
        </div>
        <div className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30 text-center">
          <p className="text-4xl font-bold text-purple-400 mb-2">{data.unique_users}</p>
          <p className="text-saru-teal">Unique Users</p>
        </div>
      </div>
      <div className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30">
        <h3 className="text-saru-teal font-semibold mb-4">Topic Counts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.topic_counts && Object.entries(data.topic_counts).map(([topic, count]) => (
            <div key={topic} className="flex justify-between">
              <span className="text-saru-cyan">{topic}</span>
              <span className="text-saru-teal">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
