import React from 'react'

export default function FeedbackTable({ feedbacks }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-netflix-gray rounded-lg shadow-2xl">
        <thead>
          <tr className="bg-netflix-dark text-netflix-light">
            <th className="py-4 px-6 text-left font-semibold">ID</th>
            <th className="py-4 px-6 text-left font-semibold">Company ID</th>
            <th className="py-4 px-6 text-left font-semibold">Channel</th>
            <th className="py-4 px-6 text-left font-semibold">Text</th>
            <th className="py-4 px-6 text-left font-semibold">Sentiment</th>
            <th className="py-4 px-6 text-left font-semibold">Topics</th>
            <th className="py-4 px-6 text-left font-semibold">Created At</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb, index) => (
            <tr
              key={fb.id}
              className={`hover:bg-netflix-dark transition duration-300 ${index % 2 === 0 ? 'bg-netflix-gray' : 'bg-netflix-dark'}`}
            >
              <td className="py-4 px-6 text-netflix-light">{fb.id}</td>
              <td className="py-4 px-6 text-netflix-light">{fb.company_id}</td>
              <td className="py-4 px-6 text-netflix-light">{fb.channel}</td>
              <td className="py-4 px-6 text-netflix-light max-w-xs truncate" title={fb.text}>{fb.text}</td>
              <td className="py-4 px-6">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  fb.sentiment === 'positive' ? 'bg-green-600 text-white' :
                  fb.sentiment === 'negative' ? 'bg-red-600 text-white' :
                  'bg-yellow-600 text-white'
                }`}>
                  {fb.sentiment}
                </span>
              </td>
              <td className="py-4 px-6 text-netflix-light">{fb.topics}</td>
              <td className="py-4 px-6 text-netflix-light">{new Date(fb.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
