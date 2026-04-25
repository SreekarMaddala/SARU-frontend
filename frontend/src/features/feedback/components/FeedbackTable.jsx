import React from "react";

export default function FeedbackTable({ feedbacks }) {
  return (
    // Outer container: Base for Salesforce-like theme (light background)
    <div className="w-full min-h-screen bg-gray-50 text-gray-800 flex justify-center items-start py-10 px-6">
      {/* Inner Container: Changed max-w-[95%] to w-full max-w-full for 100% width */}
      <div className="w-full max-w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-100 text-blue-600 uppercase text-xs tracking-wider border-b border-gray-200">
                <th className="py-3 px-4 font-bold whitespace-nowrap">ID</th>
                <th className="py-3 px-4 font-bold whitespace-nowrap">Company ID</th>
                <th className="py-3 px-4 font-bold whitespace-nowrap">Channel</th>
                {/* Changed from w-[20%] to w-auto to allow full width distribution */}
                <th className="py-3 px-4 font-bold w-auto min-w-[150px]">Text</th> 
                <th className="py-3 px-4 font-bold whitespace-nowrap">Product</th>
                <th className="py-3 px-4 font-bold whitespace-nowrap">Sentiment</th>
                <th className="py-3 px-4 font-bold whitespace-nowrap">Score</th>
                <th className="py-3 px-4 font-bold whitespace-nowrap">Topics</th>
                <th className="py-3 px-4 font-bold whitespace-nowrap">User ID</th>
                <th className="py-3 px-4 font-bold whitespace-nowrap">Name</th>
                <th className="py-3 px-4 font-bold whitespace-nowrap">Email/Mobile</th>
                <th className="py-3 px-4 font-bold whitespace-nowrap">Created At</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {feedbacks.map((fb, index) => (
                <tr
                  key={fb.id}
                  className={`transition duration-150 border-b border-gray-100 ${
                    index % 2 === 0
                      ? "bg-white hover:bg-blue-50/50" 
                      : "bg-gray-50 hover:bg-blue-50/70"
                  }`}
                >
                  <td className="py-3 px-4 text-sm">{fb.id}</td>
                  <td className="py-3 px-4 text-sm">{fb.company_id}</td>
                  <td className="py-3 px-4 text-sm">{fb.channel}</td>
                  <td
                    className="py-3 px-4 max-w-xs truncate text-sm"
                    title={fb.text}
                  >
                    {fb.text}
                  </td>
                  <td className="py-3 px-4 text-sm">{fb.product_name || "N/A"}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                        fb.sentiment === "positive"
                          ? "bg-green-500" 
                          : fb.sentiment === "negative"
                          ? "bg-red-500"  
                          : "bg-yellow-500" 
                      }`}
                    >
                      {fb.sentiment || "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{fb.sentiment_score ?? "N/A"}</td>
                  <td className="py-3 px-4 text-sm">{fb.topics}</td>
                  <td className="py-3 px-4 text-sm">{fb.user_id}</td>
                  <td className="py-3 px-4 text-sm">{fb.name}</td>
                  <td className="py-3 px-4 text-sm">{fb.email_or_mobile}</td>
                  <td className="py-3 px-4 text-sm whitespace-nowrap">
                    {new Date(fb.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}