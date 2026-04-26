import { useState, useEffect } from "react";
import Layout from "../../../shared/components/Layout";
import FeedbackTable from "../components/FeedbackTable";
import CsvUploadSection from "../components/CsvUploadSection";
import FeedbackCreationForm from "../components/FeedbackCreationForm";
import { getAllFeedback, submitFeedback } from "../api";

export default function FeedbackTablePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  const handleCreateFeedback = async (formData) => {
    setSubmitting(true);
    try {
      const payload = {
        company_id: formData.company_id ? Number(formData.company_id) : undefined,
        channel: formData.channel,
        text: formData.text,
        email: formData.email?.trim() || undefined,
        mobile: formData.mobile?.trim() || undefined,
        name: formData.name?.trim() || undefined,
        product_id: formData.product_id ? Number(formData.product_id) : undefined,
        product_model_number: formData.product_model_number?.trim() || undefined,
        sentiment: formData.sentiment?.trim() || undefined,
        topics: formData.topics?.trim() || undefined,
        sentiment_score:
          formData.sentiment_score !== "" ? Number(formData.sentiment_score) : undefined,
        likes: formData.likes !== "" ? Number(formData.likes) : undefined,
      };

      await submitFeedback(payload);
      await fetchFeedback();
      setErrorMsg("");
    } catch (error) {
      console.error("Error creating feedback:", error);
      setErrorMsg(
        error.response?.data?.detail ||
          "Failed to submit feedback. Please verify fields and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout variant="protected">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-saru-cyan">Feedback</h1>

        {/* CSV Upload Section */}
        <CsvUploadSection onUploadSuccess={fetchFeedback} />

        <div className="bg-saru-slate rounded-2xl shadow-lg p-6 border border-saru-cyan/20">
          <h2 className="text-2xl font-bold text-saru-cyan mb-4">Create Feedback (JSON)</h2>
          <FeedbackCreationForm onSubmit={handleCreateFeedback} loading={submitting} />
        </div>

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
