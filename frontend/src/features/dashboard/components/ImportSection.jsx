import { useState } from "react";
import {
  uploadCSV,
  importGoogleForms,
  importEmails,
  importTwitter,
} from "../api";
import Button from "../../../shared/components/Button";

export default function ImportSection({ onImportSuccess }) {
  const [file, setFile] = useState(null);
  const [sheetId, setSheetId] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [nextTwitterFetch, setNextTwitterFetch] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [loading, setLoading] = useState(false);

  // Countdown timer effect could be extracted to a hook, but kept inline for simplicity
  const startCountdown = (utcTime) => {
    setNextTwitterFetch(utcTime);
    const interval = setInterval(() => {
      const diff = new Date(utcTime) - new Date();
      if (diff <= 0) {
        setCountdown("");
        setNextTwitterFetch(null);
        clearInterval(interval);
      } else {
        const h = Math.floor(diff / 1000 / 3600);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setCountdown(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
    // Return cleanup for potential useEffect integration
    return () => clearInterval(interval);
  };

  const handleUploadCSV = async () => {
    if (!file) return alert("Select a file first.");
    setLoading(true);
    try {
      const data = await uploadCSV(file);
      alert(`Inserted ${data.inserted} feedbacks`);
      await onImportSuccess();
    } catch {
      alert("CSV upload failed");
    }
    setLoading(false);
  };

  const handleGoogleForms = async () => {
    if (!sheetId) return alert("Enter a Google Sheet ID.");
    setLoading(true);
    try {
      const data = await importGoogleForms(sheetId);
      alert(`Inserted ${data.inserted} feedbacks`);
      await onImportSuccess();
    } catch {
      alert("Google Forms import failed");
    }
    setLoading(false);
  };

  const handleEmails = async () => {
    setLoading(true);
    try {
      const data = await importEmails();
      alert(`Inserted ${data.inserted} feedbacks`);
      await onImportSuccess();
    } catch {
      alert("Email import failed");
    }
    setLoading(false);
  };

  const handleTwitter = async () => {
    if (!twitterHandle) return alert("Enter a Twitter handle.");
    if (nextTwitterFetch) return alert(`Wait ${countdown} to fetch again.`);
    setLoading(true);
    try {
      const data = await importTwitter(twitterHandle);
      if (data.message?.includes("after")) {
        const match = data.message.match(/after (.*?) UTC/);
        if (match) startCountdown(match[1] + " UTC");
      }
      alert(`Inserted ${data.inserted} feedbacks`);
      await onImportSuccess();
    } catch {
      alert("Twitter import failed");
    }
    setLoading(false);
  };

  const importCards = [
    {
      title: "Upload CSV",
      input: (
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full text-neutral-300 file:bg-primary-500 file:text-white file:border-none file:rounded-lg file:px-4 file:py-2 file:font-semibold hover:file:bg-primary-600"
        />
      ),
      action: handleUploadCSV,
      btnText: "Upload",
    },
    {
      title: "Google Sheets",
      input: (
        <input
          type="text"
          placeholder="Enter Google Sheet ID"
          value={sheetId}
          onChange={(e) => setSheetId(e.target.value)}
          className="w-full bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-lg px-4 py-2 mb-4 focus:border-primary-500 focus:outline-none"
        />
      ),
      action: handleGoogleForms,
      btnText: "Import",
    },
    {
      title: "Import Emails",
      input: null,
      action: handleEmails,
      btnText: "Import Unread Emails",
    },
    {
      title: "Twitter Mentions",
      input: (
        <>
          <input
            type="text"
            placeholder="Enter Twitter Handle"
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value)}
            className="w-full bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-lg px-4 py-2 mb-4 focus:border-primary-500 focus:outline-none"
          />
          {countdown && (
            <p className="mb-2 text-yellow-400 font-semibold text-sm">
              Next fetch in: {countdown}
            </p>
          )}
        </>
      ),
      action: handleTwitter,
      btnText: "Import",
      disabled: !!nextTwitterFetch,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {importCards.map((card, idx) => (
        <div
          key={idx}
          className="bg-neutral-900 rounded-xl p-6 shadow-lg border border-primary-800"
        >
          <h2 className="text-2xl font-title text-primary-300 mb-4">{card.title}</h2>
          {card.input}
          <Button
            onClick={card.action}
            disabled={loading || card.disabled}
            loading={loading}
            variant="primary"
            size="md"
            className="w-full"
          >
            {card.btnText}
          </Button>
        </div>
      ))}
    </div>
  );
}

