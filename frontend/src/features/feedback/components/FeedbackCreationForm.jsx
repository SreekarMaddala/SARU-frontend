import React, { useState, useEffect } from "react";
import { getProducts } from '../../products/api';

export default function FeedbackCreationForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    company_id: "",
    text: "",
    channel: "web",
    email: "",
    mobile: "",
    name: "",
    product_id: "",
    product_model_number: "",
    sentiment: "",
    topics: "",
    sentiment_score: "",
    likes: "",
  });
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };
    loadProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      alert("Please enter feedback text");
      return;
    }
    if (!formData.email.trim() && !formData.mobile.trim()) {
      alert("Please provide at least one contact: email or mobile");
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-saru-cyan mb-2">Company ID (Optional)</label>
        <input
          name="company_id"
          type="number"
          value={formData.company_id}
          onChange={handleChange}
          className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
          placeholder="Ignored if token company is enforced by backend"
        />
      </div>

      <div>
        <label className="block text-saru-cyan mb-2">Feedback Text *</label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none h-24 resize-none"
          placeholder="Enter your feedback here..."
          required
        />
      </div>

      <div>
        <label className="block text-saru-cyan mb-2">Channel</label>
        <select
          name="channel"
          value={formData.channel}
          onChange={handleChange}
          className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
        >
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
          <option value="email">Email</option>
          <option value="social">Social Media</option>
          <option value="survey">Survey</option>
        </select>
      </div>

      <div>
        <label className="block text-saru-cyan mb-2">Name (Optional)</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
          placeholder="Customer name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-saru-cyan mb-2">Email (Optional)</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
            placeholder="name@example.com"
          />
        </div>
        <div>
          <label className="block text-saru-cyan mb-2">Mobile (Optional)</label>
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
            placeholder="+1234567890"
          />
        </div>
      </div>

      <div>
        <label className="block text-saru-cyan mb-2">Product (Optional)</label>
        {loadingProducts ? (
          <div className="text-saru-cyan/70">Loading products...</div>
        ) : (
          <select
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
          >
            <option value="">Select a product (optional)</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label className="block text-saru-cyan mb-2">Product Model Number (Optional)</label>
        <input
          name="product_model_number"
          value={formData.product_model_number}
          onChange={handleChange}
          className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
          placeholder="e.g. IPHONE-15-PRO"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-saru-cyan mb-2">Sentiment (Optional)</label>
          <input
            name="sentiment"
            value={formData.sentiment}
            onChange={handleChange}
            className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
            placeholder="positive / neutral / negative"
          />
        </div>
        <div>
          <label className="block text-saru-cyan mb-2">Sentiment Score (Optional)</label>
          <input
            name="sentiment_score"
            type="number"
            step="any"
            value={formData.sentiment_score}
            onChange={handleChange}
            className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
            placeholder="e.g. 0.82"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-saru-cyan mb-2">Topics (Optional)</label>
          <input
            name="topics"
            value={formData.topics}
            onChange={handleChange}
            className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
            placeholder="Comma-separated topics"
          />
        </div>
        <div>
          <label className="block text-saru-cyan mb-2">Likes (Optional)</label>
          <input
            name="likes"
            type="number"
            value={formData.likes}
            onChange={handleChange}
            className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
            placeholder="e.g. 10"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-saru-cyan text-saru-black px-6 py-3 rounded-lg font-semibold hover:bg-saru-teal transition duration-300 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}
