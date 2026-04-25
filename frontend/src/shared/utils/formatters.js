/**
 * Format a date string to a locale string
 * @param {string|Date} date
 * @param {object} options - Intl.DateTimeFormat options
 */
export function formatDate(date, options = {}) {
  if (!date) return "N/A";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid Date";
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  });
}

/**
 * Format a number to fixed decimal places
 * @param {number} value
 * @param {number} digits
 */
export function formatNumber(value, digits = 2) {
  if (value === null || value === undefined || isNaN(value)) return "N/A";
  return Number(value).toFixed(digits);
}

/**
 * Format a sentiment score with color class
 * @param {number} score
 */
export function getSentimentColor(score) {
  if (score === null || score === undefined || isNaN(score)) return "text-gray-400";
  if (score > 0.3) return "text-green-400";
  if (score < -0.3) return "text-red-400";
  return "text-yellow-400";
}

/**
 * Format a sentiment label with badge color class
 * @param {string} sentiment
 */
export function getSentimentBadgeClass(sentiment) {
  switch (sentiment?.toLowerCase()) {
    case "positive":
      return "bg-green-500";
    case "negative":
      return "bg-red-500";
    case "neutral":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
}

