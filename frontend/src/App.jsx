import React, { useEffect, useState } from 'react'
import FeedbackTable from './components/FeedbackTable'

const API_URL = "http://localhost:8000";

async function fetchFeedback() {
  const res = await fetch(`${API_URL}/feedback`);
  const data = await res.json();
  console.log(data);
  return data;
}

function App() {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeedback();
        setFeedbacks(data);
      } catch (err) {
        console.error('Error fetching feedback:', err);
      }
    };
    fetchData();
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Feedback Collector MVP 🚀</h1>
      <FeedbackTable feedbacks={feedbacks} />
    </div>
  )
}

export default App
