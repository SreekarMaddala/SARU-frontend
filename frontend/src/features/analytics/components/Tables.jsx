import React from "react";
import { formatDate, formatNumber } from "../../../shared/utils/formatters";

/**
 * Reusable Analytics Table with sortable columns
 */
export function AnalyticsTable({
  data,
  columns,
  emptyMessage = "No data available.",
  loading = false,
}) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-saru-cyan">{emptyMessage}</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-saru-cyan">
        <thead>
          <tr className="border-b border-saru-cyan/30">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left py-3 px-4 font-semibold uppercase text-xs tracking-wider ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-saru-cyan/10">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-saru-teal/5 transition">
              {columns.map((col) => (
                <td key={col.key} className={`py-3 px-4 ${col.className || ""}`}>
                  {col.render
                    ? col.render(row[col.key], row)
                    : formatCell(row[col.key], col.type)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Format cell value based on type
 */
function formatCell(value, type) {
  switch (type) {
    case "date":
      return formatDate(value);
    case "number":
      return formatNumber(value);
    case "sentiment":
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
            value === "positive"
              ? "bg-green-500"
              : value === "negative"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        >
          {value || "N/A"}
        </span>
      );
    default:
      return value ?? "N/A";
  }
}

/**
 * Simple Key-Value Stats Grid
 */
export function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-saru-black p-6 rounded-lg border border-saru-cyan/30 text-center"
        >
          <p className={`text-4xl font-bold mb-2 ${stat.color || "text-saru-cyan"}`}>
            {stat.value}
          </p>
          <p className="text-saru-teal">{stat.label}</p>
          {stat.subtitle && (
            <p className="text-sm text-saru-cyan/60 mt-1">{stat.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default { AnalyticsTable, StatsGrid };

