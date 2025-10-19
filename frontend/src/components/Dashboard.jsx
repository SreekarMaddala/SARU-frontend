import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getProducts, createProduct } from "../services/productApi";

// ✅ Tailwind + Fonts + Icons Imports (global)
import "../index.css"; // see below for inline contents

// --- FeedbackTable Component ---
function FeedbackTable({ feedbacks }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-700">
        <thead>
          <tr>
            {["ID", "Channel", "Feedback", "Created At"].map((head) => (
              <th
                key={head}
                className="px-6 py-3 text-left text-xs font-medium text-primary-400 uppercase tracking-wider"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-neutral-900 divide-y divide-neutral-700">
          {feedbacks.map((fb) => (
            <tr key={fb.id} className="hover:bg-neutral-800 transition duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-primary-300">{fb.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-primary-300">{fb.channel}</td>
              <td
                className="px-6 py-4 text-sm text-primary-300 line-clamp-2"
                title={fb.text}
              >
                {fb.text}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-primary-300">
                {new Date(fb.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Main Dashboard Component ---
export default function Dashboard() {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [sheetId, setSheetId] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextTwitterFetch, setNextTwitterFetch] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [creatingProduct, setCreatingProduct] = useState(false);

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

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    loadFeedbacks();
    loadProducts();
  }, []);

  useEffect(() => {
    if (!nextTwitterFetch) return;
    const interval = setInterval(() => {
      const diff = new Date(nextTwitterFetch) - new Date();
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
    return () => clearInterval(interval);
  }, [nextTwitterFetch]);

  const handleUploadCSV = async () => {
    if (!file) return alert("Select a file first.");
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
    } catch {
      alert("CSV upload failed");
    }
    setLoading(false);
  };

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
    } catch {
      alert("Google Forms import failed");
    }
    setLoading(false);
  };

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
      const res = await fetch(
        `http://localhost:8000/feedback/import_twitter?handle=${twitterHandle}`,
        { method: "POST" }
      );
      const data = await res.json();
      if (data.message?.includes("after")) {
        const match = data.message.match(/after (.*?) UTC/);
        if (match) setNextTwitterFetch(match[1] + " UTC");
      }
      alert(`Inserted ${data.inserted} feedbacks`);
      await loadFeedbacks();
    } catch {
      alert("Twitter import failed");
    }
    setLoading(false);
  };

  const handleCreateProduct = async () => {
    if (!newProductName.trim()) return alert("Enter a product name.");
    setCreatingProduct(true);
    try {
      await createProduct({
        name: newProductName.trim(),
        description: newProductDescription.trim(),
      });
      setNewProductName("");
      setNewProductDescription("");
      await loadProducts();
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
    }
    setCreatingProduct(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-body p-8 space-y-12">
      <h1 className="text-5xl font-title font-bold text-primary-400 mb-8">
        Varshitha Feedback Dashboard
      </h1>

      {/* Products Section */}
      <div className="bg-neutral-900 rounded-xl p-6 shadow-lg border border-primary-800">
        <h2 className="text-2xl font-title text-primary-300 mb-4">Products</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="w-full bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Product Description (optional)"
              value={newProductDescription}
              onChange={(e) => setNewProductDescription(e.target.value)}
              className="w-full bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-lg px-4 py-2 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <button
            onClick={handleCreateProduct}
            disabled={creatingProduct}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-neutral-700"
          >
            {creatingProduct ? "Creating..." : "Create Product"}
          </button>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-primary-300 mb-2">Existing Products</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {products.map((product) => (
              <div key={product.id} className="bg-neutral-800 p-3 rounded-lg">
                <div className="font-semibold text-primary-300">{product.name}</div>
                {product.description && (
                  <div className="text-sm text-neutral-400">{product.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Import Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* CSV */}
        <div className="bg-neutral-900 rounded-xl p-6 shadow-lg border border-primary-800">
          <h2 className="text-2xl font-title text-primary-300 mb-4">Upload CSV</h2>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4 w-full text-neutral-300 file:bg-primary-500 file:text-white file:border-none file:rounded-lg file:px-4 file:py-2 file:font-semibold hover:file:bg-primary-600"
          />
          <button
            onClick={handleUploadCSV}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Upload
          </button>
        </div>

        {/* Google Sheets */}
        <div className="bg-neutral-900 rounded-xl p-6 shadow-lg border border-primary-800">
          <h2 className="text-2xl font-title text-primary-300 mb-4">
            Google Sheets
          </h2>
          <input
            type="text"
            placeholder="Enter Google Sheet ID"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
            className="w-full bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-lg px-4 py-2 mb-4 focus:border-primary-500 focus:outline-none"
          />
          <button
            onClick={handleGoogleForms}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Import
          </button>
        </div>

        {/* Emails */}
        <div className="bg-neutral-900 rounded-xl p-6 shadow-lg border border-primary-800">
          <h2 className="text-2xl font-title text-primary-300 mb-4">Import Emails</h2>
          <button
            onClick={handleEmails}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Import Unread Emails
          </button>
        </div>

        {/* Twitter */}
        <div className="bg-neutral-900 rounded-xl p-6 shadow-lg border border-primary-800">
          <h2 className="text-2xl font-title text-primary-300 mb-4">
            Twitter Mentions
          </h2>
          <input
            type="text"
            placeholder="Enter Twitter Handle"
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value)}
            className="w-full bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-lg px-4 py-2 mb-4 focus:border-primary-500 focus:outline-none"
          />
          <button
            onClick={handleTwitter}
            disabled={!!nextTwitterFetch}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-neutral-700"
          >
            Import
          </button>
          {countdown && (
            <p className="mt-2 text-yellow-400 font-semibold">
              Next fetch in: {countdown}
            </p>
          )}
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-neutral-900 rounded-xl p-8 shadow-lg border border-primary-800">
        <h2 className="text-3xl font-title text-primary-300 mb-6">All Feedback</h2>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <FeedbackTable feedbacks={feedbacks} />
        )}
      </div>
    </div>
  );
}
