import { useEffect, useMemo, useState } from "react";
import { fetchCustomerRetention } from "../api";
import { FeedbackBarChart, SentimentTrendChart, StatCard } from "../components/Charts";

export default function CustomerRetentionPage() {
  const [retentionData, setRetentionData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRetentionData = async () => {
      try {
        const result = await fetchCustomerRetention();
        const normalized = Array.isArray(result?.retention_over_time)
          ? result.retention_over_time
          : [];
        setRetentionData(normalized);
        setSummary(result?.summary ?? null);
      } catch (err) {
        setError("Failed to load customer retention analytics");
      } finally {
        setLoading(false);
      }
    };

    loadRetentionData();
  }, []);

  const latestRate = useMemo(() => {
    if (!retentionData.length) return 0;
    const lastPoint = retentionData[retentionData.length - 1];
    return Number(lastPoint?.retention_rate ?? 0);
  }, [retentionData]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-saru-cyan">Customer Retention</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Current Retention Rate"
          value={`${latestRate.toFixed(1)}%`}
          subtitle="Most recent period"
        />
        <StatCard
          title="Retained Customers"
          value={summary?.retained_customers ?? 0}
          subtitle="Customers who returned"
          color="text-saru-teal"
        />
        <StatCard
          title="Churned Customers"
          value={summary?.churned_customers ?? 0}
          subtitle="Customers who dropped off"
          color="text-red-400"
        />
      </div>

      <div className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30">
        <h3 className="text-saru-teal font-semibold mb-4">Retention Trend</h3>
        {retentionData.length === 0 ? (
          <p className="text-saru-cyan/70">No retention data available yet.</p>
        ) : (
          <SentimentTrendChart
            data={retentionData.map((point) => ({
              date: point.period,
              positive: point.retention_rate,
              neutral: point.new_customers ?? 0,
              negative: point.churn_rate ?? 0,
            }))}
            lines={["positive", "neutral", "negative"]}
          />
        )}
      </div>

      <div className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30">
        <h3 className="text-saru-teal font-semibold mb-4">Retained vs Churned by Period</h3>
        {retentionData.length === 0 ? (
          <p className="text-saru-cyan/70">No retention distribution data available.</p>
        ) : (
          <FeedbackBarChart
            data={retentionData.map((point) => ({
              name: point.period,
              count: point.retained_customers ?? 0,
            }))}
            dataKey="count"
            xKey="name"
            color="#00A8A8"
          />
        )}
      </div>
    </div>
  );
}
