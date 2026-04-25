import React from 'react'

export default function FeedbackTable({ feedbacks }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-saru-slate rounded-lg shadow-2xl">
        <thead>
          <tr className="bg-saru-slate-dark text-saru-cyan">
            <th className="py-4 px-6 text-left font-semibold">ID</th>
            <th className="py-4 px-6 text-left font-semibold">Channel</th>
            <th className="py-4 px-6 text-left font-semibold">Text</th>
            <th className="py-4 px-6 text-left font-semibold">Product</th>
            <th className="py-4 px-6 text-left font-semibold">Created At</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb, index) => (
            <tr
              key={fb.id}
              className={`hover:bg-saru-slate-dark transition duration-300 ${index % 2 === 0 ? 'bg-saru-slate' : 'bg-saru-slate-dark'}`}
            >
              <td className="py-4 px-6 text-saru-cyan">{fb.id}</td>
              <td className="py-4 px-6 text-saru-cyan">{fb.channel}</td>
              <td className="py-4 px-6 text-saru-cyan max-w-xs truncate" title={fb.text}>{fb.text}</td>
              <td className="py-4 px-6 text-saru-cyan">{fb.product_name || 'N/A'}</td>
              <td className="py-4 px-6 text-saru-cyan">{new Date(fb.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
