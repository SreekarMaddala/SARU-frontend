import FeedbackTable from '../components/FeedbackTable';
import { useState, useEffect } from 'react';

export default function FeedbackTablePage() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch('http://localhost:8000/feedback');
        const data = await res.json();
        setFeedbacks(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-8">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-16" />
          <h1 className="text-3xl font-bold">Feedback Table</h1>
        </div>
      </header>
      <div className="p-8">
        <FeedbackTable feedbacks={feedbacks} />
      </div>
    </div>
  );
}
