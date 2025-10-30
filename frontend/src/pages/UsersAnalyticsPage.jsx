import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchUsers } from '../services/analyticsApi';

export default function UsersAnalyticsPage() {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchUsers();
        setData(result);
      } catch (err) {
        setError('Failed to load user analytics');
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
      <h2 className="text-3xl font-bold text-saru-cyan mb-6">User Behavior Analysis</h2>
      {data.length === 0 ? (
        <div className="text-center py-8 text-saru-cyan">No user analytics data available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((user, index) => (
            <div key={index} className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30">
              <h3 className="text-saru-teal font-semibold mb-2">{user.user_id}</h3>
              <p className="text-saru-cyan">Feedback Count: {user.feedback_count}</p>
              <p className="text-saru-cyan">Avg Sentiment: {user.avg_sentiment?.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
