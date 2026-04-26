import { useState, useEffect } from "react";
import Layout from "../../../shared/components/Layout";
import FeedbackTable from "../components/FeedbackTable";
import CsvUploadSection from "../components/CsvUploadSection";
import { getAllFeedback } from "../api";

export default function FeedbackTablePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const data = await getAllFeedback();
      setFeedbacks(data);
      setErrorMsg("");
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setErrorMsg("Failed to load feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Feedback | SARU";
    fetchFeedback();
  }, []);

  return (
    <Layout variant="protected">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-saru-cyan">Feedback</h1>

        {/* CSV Upload Section */}
        <CsvUploadSection onUploadSuccess={fetchFeedback} />

        {errorMsg && (
          <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-xl">
            {errorMsg}
          </div>
        )}

        <div className="bg-saru-slate rounded-2xl shadow-lg p-6 border border-saru-cyan/20">
          {loading ? (
            <p className="text-saru-cyan/70 text-center py-8 animate-pulse">
              Loading feedback...
            </p>
          ) : feedbacks.length === 0 ? (
            <p className="text-saru-cyan/70 text-center py-8">
              No feedback found.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <FeedbackTable feedbacks={feedbacks} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
