import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchTemporal } from '../services/analyticsApi';

export default function TemporalAnalyticsPage() {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchTemporal();
        setData(result);
      } catch (err) {
        setError('Failed to load temporal analytics');
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
      <h2 className="text-3xl font-bold text-saru-cyan mb-6">Temporal Analysis</h2>
      <div className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30">
        <h3 className="text-saru-teal font-semibold mb-4">Daily Feedback Trends</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-saru-cyan">
            <thead>
              <tr className="border-b border-saru-cyan/30">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Feedback Count</th>
                <th className="text-left py-2">Avg Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b border-saru-cyan/10">
                  <td className="py-2">{item.date}</td>
                  <td className="py-2">{item.feedback_count}</td>
                  <td className="py-2">{item.avg_sentiment?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
