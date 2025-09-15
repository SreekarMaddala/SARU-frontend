import { Link } from 'react-router-dom';
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
    <div className="min-h-screen bg-netflix-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-netflix-black bg-opacity-90 backdrop-blur-sm">
        <div className="flex justify-between items-center p-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-4">
              <img src="/logo.png" alt="Logo" className="h-16" />
              <h1 className="text-3xl font-bold text-netflix-light">Feedback Collector</h1>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/dashboard" className="text-netflix-light hover:text-netflix-red transition duration-300 relative">
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-netflix-red transition-all duration-300 hover:w-full"></span>
            </Link>
            <span className="text-netflix-red font-semibold">Feedback Table</span>
            <a href="#" className="text-netflix-light hover:text-netflix-red transition duration-300 relative">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-netflix-red transition-all duration-300 hover:w-full"></span>
            </a>
          </div>
          <button className="md:hidden text-netflix-light">☰</button>
        </div>
      </nav>
      <div className="p-8">
        <h1 className="text-5xl font-bold text-netflix-light mb-8">📋 Feedback Table</h1>
        <FeedbackTable feedbacks={feedbacks} />
      </div>
    </div>
  );
}
