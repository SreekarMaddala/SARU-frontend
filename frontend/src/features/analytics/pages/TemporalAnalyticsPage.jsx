import React, { useState, useEffect } from 'react';
import Layout from '../../../shared/components/Layout';
import { AnalyticsTable } from '../components/Tables';
import { useAuth } from '../../auth/context';
import { fetchTemporal } from '../api';

const temporalColumns = [
  { key: 'date', header: 'Date' },
  { key: 'feedback_count', header: 'Feedback Count', type: 'number' },
  { key: 'avg_sentiment', header: 'Avg Sentiment', type: 'number' },
];

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
    <Layout variant="protected">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-saru-cyan mb-6">Temporal Analysis</h2>
        <div className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30">
          <h3 className="text-saru-teal font-semibold mb-4">Daily Feedback Trends</h3>
          <AnalyticsTable data={data} columns={temporalColumns} emptyMessage="No temporal analytics data available." />
        </div>
      </div>
    </Layout>
  );
}
