import FeedbackTable from '../components/FeedbackTable';
import { useState, useEffect } from "react";
import Layout from '../../../shared/components/Layout';
import { getAllFeedback } from '../api';

export default function FeedbackTablePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    document.title = "Feedback Table | SARU";
  }, []);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await getAllFeedback();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setErrorMsg("Failed to load feedback. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <Layout variant="protected">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-center md:text-left">
            {errorMsg}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          {loading ? (
            <p className="text-gray-500 text-center py-8 animate-pulse">
              Loading feedback...
            </p>
          ) : feedbacks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No feedback found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <FeedbackTable feedbacks={feedbacks} />
            </div>
          )}
        </div>
      </main>

      <footer className="mt-12 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} SARU Feedback System. All rights reserved.
      </footer>
    </Layout>
  );
}
