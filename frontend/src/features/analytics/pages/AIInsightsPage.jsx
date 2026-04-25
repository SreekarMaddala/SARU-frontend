import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from '../../../shared/components/Layout';
import { SentimentTrendChart, FeedbackBarChart } from "../components/Charts";
import { useAuth } from '../../auth/context';
import { fetchAIInsights, runAIAnalysis } from '../api';

export default function AIInsightsPage() {
  const { token } = useAuth();
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAIInsights();
        setInsights(data || {});
      } catch (e) {
        setError("Failed to load AI insights");
      }
      setLoading(false);
    };
    if (token) fetchInsights();
  }, [token]);

  const handleRunAnalysis = async () => {
    if (running) return;
    setRunning(true);
    setError(null);
    try {
      await runAIAnalysis();
      const data = await fetchAIInsights();
      setInsights(data || {});
    } catch (e) {
      setError("Failed to trigger AI analysis");
    }
    setRunning(false);
  };

  const sentimentTrend = useMemo(() => {
    return Array.isArray(insights?.sentiment_trend) ? insights.sentiment_trend : [];
  }, [insights]);

  const topIssues = useMemo(() => {
    const arr = Array.isArray(insights?.top_issues) ? insights.top_issues : [];
    return arr.slice(0, 5);
  }, [insights]);

  if (loading)
    return (
      <div className="min-h-screen bg-saru-black flex items-center justify-center">
        <div className="text-saru-cyan text-xl">Loading agentic insights...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-saru-black flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );

  return (
    <Layout variant="protected">
      <div className="p-8 space-y-10">
        <div className="flex items-start justify-between gap-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-bold">
            Agentic AI Insights
          </motion.h1>
          <div className="flex items-center gap-3">
            {running && (
              <div className="w-10 h-10 border-2 border-saru-teal border-t-transparent rounded-full animate-spin" />
            )}
            <button onClick={handleRunAnalysis} disabled={running} className="bg-saru-teal text-saru-black px-5 py-3 rounded-lg font-semibold hover:bg-saru-teal-dark transition disabled:opacity-50">
              {running ? "Analyzing..." : "Run New Analysis"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-saru-black-light p-6 rounded-xl border border-saru-cyan/30">
            <p className="text-sm text-saru-cyan/70">AI Summary</p>
            <p className="mt-2 text-lg">{insights?.summary || "No summary available"}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-saru-black-light p-6 rounded-xl border border-saru-cyan/30">
            <p className="text-sm text-saru-cyan/70">Recommendations</p>
            <ul className="mt-2 space-y-2 list-disc list-inside">
              {(insights?.recommendations || []).map((rec, idx) => (
                <li key={idx} className="text-saru-cyan">{rec}</li>
              ))}
              {!insights?.recommendations?.length && <li className="text-saru-cyan/70">No recommendations yet</li>}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-saru-black-light p-6 rounded-xl border border-saru-cyan/30">
            <p className="text-sm text-saru-cyan/70">Last Updated</p>
            <p className="mt-2 text-lg">{insights?.timestamp ? new Date(insights.timestamp).toLocaleString() : "N/A"}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-saru-black-light p-6 rounded-xl border border-saru-cyan/30">
            <h3 className="text-xl font-semibold mb-4">Sentiment Trend</h3>
            <SentimentTrendChart data={sentimentTrend} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-saru-black-light p-6 rounded-xl border border-saru-cyan/30">
            <h3 className="text-xl font-semibold mb-4">Top 5 Issues</h3>
            <FeedbackBarChart data={topIssues} xKey="issue" dataKey="count" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-saru-black-light p-6 rounded-xl border border-saru-cyan/30">
          <h3 className="text-xl font-semibold mb-3">How this enhances Agentic AI</h3>
          <ul className="list-disc list-inside space-y-2 text-saru-cyan/90">
            <li>The AI autonomously learns from feedback trends and updates the dashboard.</li>
            <li>Admins or companies can trigger re-analysis anytime to get adaptive recommendations.</li>
          </ul>
        </motion.div>
      </div>
    </Layout>
  );
}
