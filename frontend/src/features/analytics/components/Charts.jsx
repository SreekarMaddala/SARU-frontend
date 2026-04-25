import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#00A8A8", "#E0FBFC", "#EF4444", "#8B5CF6", "#F59E0B"];

const tooltipStyle = {
  backgroundColor: "#0b0c10",
  border: "1px solid #1f2937",
  color: "#e6f4f4",
};

/**
 * Reusable Line Chart for sentiment trends
 */
export function SentimentTrendChart({ data, lines = ["positive", "neutral", "negative"] }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2f2f2f" />
        <XAxis dataKey="date" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip contentStyle={tooltipStyle} />
        {lines.includes("positive") && (
          <Line type="monotone" dataKey="positive" stroke="#00A8A8" strokeWidth={2} dot={false} />
        )}
        {lines.includes("neutral") && (
          <Line type="monotone" dataKey="neutral" stroke="#E0FBFC" strokeWidth={2} dot={false} />
        )}
        {lines.includes("negative") && (
          <Line type="monotone" dataKey="negative" stroke="#EF4444" strokeWidth={2} dot={false} />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

/**
 * Reusable Bar Chart
 */
export function FeedbackBarChart({ data, dataKey = "count", xKey = "name", color = "#00A8A8" }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2f2f2f" />
        <XAxis dataKey={xKey} stroke="#9CA3AF" interval={0} angle={-20} height={70} textAnchor="end" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/**
 * Reusable Pie Chart
 */
export function FeedbackPieChart({ data, nameKey = "name", valueKey = "value" }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey={valueKey}
          nameKey={nameKey}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

/**
 * Stat Card
 */
export function StatCard({ title, value, subtitle, color = "text-saru-cyan" }) {
  return (
    <div className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30 text-center">
      <p className={`text-4xl font-bold mb-2 ${color}`}>{value}</p>
      <p className="text-saru-teal">{title}</p>
      {subtitle && <p className="text-sm text-saru-cyan/60 mt-1">{subtitle}</p>}
    </div>
  );
}

export default { SentimentTrendChart, FeedbackBarChart, FeedbackPieChart, StatCard };

