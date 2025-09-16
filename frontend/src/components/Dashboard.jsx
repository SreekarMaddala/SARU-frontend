import { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import FeedbackTable from './FeedbackTable';

export default function Dashboard() {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [sheetId, setSheetId] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextTwitterFetch, setNextTwitterFetch] = useState(null); // For 24h restriction
  const [countdown, setCountdown] = useState(""); // Timer text

  // ------------------- Load Feedbacks -------------------
  const loadFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      alert("Failed to load feedbacks");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  // ------------------- Countdown Timer -------------------
  useEffect(() => {
    if (!nextTwitterFetch) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = new Date(nextTwitterFetch) - now;
      if (diff <= 0) {
        setCountdown("");
        setNextTwitterFetch(null);
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / 1000 / 3600);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextTwitterFetch]);

  // ------------------- Upload CSV -------------------
  const handleUploadCSV = async () => {
    if (!file) return alert("Please select a file first.");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("http://localhost:8000/feedback/upload_csv", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      alert(`Inserted ${data.inserted} feedbacks`);
      await loadFeedbacks();
    } catch (err) {
      console.error(err);
      alert("CSV upload failed");
    }
    setLoading(false);
  };

  // ------------------- Import Google Forms -------------------
  const handleGoogleForms = async () => {
    if (!sheetId) return alert("Enter a Google Sheet ID.");
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/feedback/import_google_forms?sheet_id=${sheetId}`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      alert(`Inserted ${data.inserted} feedbacks`);
      await loadFeedbacks();
    } catch (err) {
      console.error(err);
      alert("Google Forms import failed");
    }
    setLoading(false);
  };

  // ------------------- Import Emails -------------------
  const handleEmails = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/feedback/import_emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(`Inserted ${data.inserted} feedbacks`);
      await loadFeedbacks();
    } catch (err) {
      console.error(err);
      alert("Email import failed");
    }
    setLoading(false);
  };

  // ------------------- Import Twitter Mentions -------------------
  const handleTwitter = async () => {
    if (!twitterHandle) return alert("Enter a Twitter handle.");
    if (nextTwitterFetch) {
      alert(`You can fetch Twitter mentions again after ${countdown}`);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/feedback/import_twitter?handle=${twitterHandle}`,
        { method: "POST" }
      );
      const data = await res.json();

      if (data.inserted === 0 && data.message) {
        alert(data.message);
        // Parse next available time from backend message
        const match = data.message.match(/after (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) UTC/);
        if (match) {
          setNextTwitterFetch(match[1] + " UTC");
        }
      } else {
        alert(`Inserted ${data.inserted} feedbacks`);
      }

      await loadFeedbacks();
    } catch (err) {
      console.error(err);
      alert("Twitter import failed");
    }
    setLoading(false);
  };

  // ------------------- JSX Render -------------------
  return (
    <div className="p-8 space-y-12">
      <h1 className="text-5xl font-bold text-saru-cyan mb-8">📊 Feedback Dashboard</h1>

      {/* Import Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* CSV Upload */}
        <div className="bg-saru-slate rounded-xl p-6 shadow-2xl hover:shadow-saru-teal/20 hover:scale-105 transition-all duration-300 border border-saru-teal/10">
          <h2 className="text-2xl font-semibold text-saru-cyan mb-4">Upload CSV</h2>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4 w-full text-saru-cyan file:bg-gradient-to-r file:from-saru-teal file:to-saru-teal-dark file:text-saru-cyan file:border-none file:rounded-lg file:px-4 file:py-2 file:font-semibold hover:file:from-saru-teal-dark hover:file:to-saru-teal"
          />
          <button
            onClick={handleUploadCSV}
            className="w-full bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-cyan px-6 py-3 rounded-lg font-semibold hover:from-saru-teal-dark hover:to-saru-teal transition duration-300"
          >
            Upload
          </button>
        </div>

        {/* Google Forms */}
        <div className="bg-saru-slate rounded-xl p-6 shadow-2xl hover:shadow-saru-teal/20 hover:scale-105 transition-all duration-300 border border-saru-teal/10">
          <h2 className="text-2xl font-semibold text-saru-cyan mb-4">Google Sheets</h2>
          <input
            type="text"
            placeholder="Enter Google Sheet ID"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
            className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-slate-dark rounded-lg px-4 py-2 mb-4 focus:border-saru-teal focus:outline-none"
          />
          <button
            onClick={handleGoogleForms}
            className="w-full bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-cyan px-6 py-3 rounded-lg font-semibold hover:from-saru-teal-dark hover:to-saru-teal transition duration-300"
          >
            Import
          </button>
        </div>

        {/* Emails */}
        <div className="bg-saru-slate rounded-xl p-6 shadow-2xl hover:shadow-saru-teal/20 hover:scale-105 transition-all duration-300 border border-saru-teal/10">
          <h2 className="text-2xl font-semibold text-saru-cyan mb-4">Import Emails</h2>
          <button
            onClick={handleEmails}
            className="w-full bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-cyan px-6 py-3 rounded-lg font-semibold hover:from-saru-teal-dark hover:to-saru-teal transition duration-300"
          >
            Import Unread Emails
          </button>
        </div>

        {/* Twitter */}
        <div className="bg-saru-slate rounded-xl p-6 shadow-2xl hover:shadow-saru-teal/20 hover:scale-105 transition-all duration-300 border border-saru-teal/10">
          <h2 className="text-2xl font-semibold text-saru-cyan mb-4">Twitter Mentions</h2>
          <input
            type="text"
            placeholder="Enter Twitter Handle"
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value)}
            className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-slate-dark rounded-lg px-4 py-2 mb-4 focus:border-saru-teal focus:outline-none"
          />
          <button
            onClick={handleTwitter}
            className="w-full bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-cyan px-6 py-3 rounded-lg font-semibold hover:from-saru-teal-dark hover:to-saru-teal transition duration-300"
            disabled={!!nextTwitterFetch} // disable while waiting
          >
            Import
          </button>
          {countdown && (
            <p className="mt-2 text-yellow-400 font-semibold">
              Next Twitter fetch available in: {countdown}
            </p>
          )}
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-saru-slate rounded-xl p-8 shadow-2xl border border-saru-teal/10">
        <h2 className="text-3xl font-semibold text-saru-cyan mb-6">All Feedback</h2>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saru-teal"></div>
          </div>
        ) : (
          <FeedbackTable feedbacks={feedbacks} />
        )}
      </div>
    </div>
  );
}
