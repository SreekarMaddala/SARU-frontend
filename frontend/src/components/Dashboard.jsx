import { useState, useEffect } from "react";
import FeedbackTable from './FeedbackTable';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [sheetId, setSheetId] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch feedback list
  const loadFeedbacks = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/feedback");
    const data = await res.json();
    setFeedbacks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  // Upload CSV
  const handleUploadCSV = async () => {
    if (!file) return alert("Please select a file first.");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/feedback/upload_csv", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    alert(`Inserted ${data.inserted} feedbacks`);
    await loadFeedbacks();
  };

  // Import Google Forms
  const handleGoogleForms = async () => {
    if (!sheetId) return alert("Enter a Google Sheet ID.");
    setLoading(true);
    const res = await fetch(
      `http://localhost:8000/feedback/import_google_forms?sheet_id=${sheetId}`,
      { method: "POST" }
    );
    const data = await res.json();
    alert(`Inserted ${data.inserted} feedbacks`);
    await loadFeedbacks();
  };

  // Import Emails
  const handleEmails = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/feedback/import_emails", {
      method: "POST",
    });
    const data = await res.json();
    alert(`Inserted ${data.inserted} feedbacks`);
    await loadFeedbacks();
  };

  // Import Twitter
  const handleTwitter = async () => {
    if (!twitterHandle) return alert("Enter a Twitter handle.");
    setLoading(true);
    const res = await fetch(
      `http://localhost:8000/feedback/import_twitter?handle=${twitterHandle}`,
      { method: "POST" }
    );
    const data = await res.json();
    alert(`Inserted ${data.inserted} feedbacks`);
    await loadFeedbacks();
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">📊 Feedback Dashboard</h1>

      {/* CSV Upload */}
      <div className="p-4 border rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">Upload CSV</h2>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-2"
        />
        <button
          onClick={handleUploadCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Upload
        </button>
      </div>

      {/* Google Forms */}
      <div className="p-4 border rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">Import Google Forms</h2>
        <input
          type="text"
          placeholder="Enter Google Sheet ID"
          value={sheetId}
          onChange={(e) => setSheetId(e.target.value)}
          className="border px-2 py-1 rounded-lg mr-2"
        />
        <button
          onClick={handleGoogleForms}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Import
        </button>
      </div>

      {/* Emails */}
      <div className="p-4 border rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">Import Emails</h2>
        <button
          onClick={handleEmails}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Import Unread Emails
        </button>
      </div>

      {/* Twitter */}
      <div className="p-4 border rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">Import Twitter Mentions</h2>
        <input
          type="text"
          placeholder="Enter Twitter Handle"
          value={twitterHandle}
          onChange={(e) => setTwitterHandle(e.target.value)}
          className="border px-2 py-1 rounded-lg mr-2"
        />
        <button
          onClick={handleTwitter}
          className="bg-sky-600 text-white px-4 py-2 rounded-lg"
        >
          Import
        </button>
      </div>

      {/* Feedback Table */}
      <div className="p-4 border rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">All Feedback</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <FeedbackTable feedbacks={feedbacks} />
        )}
      </div>
    </div>
  );
}
