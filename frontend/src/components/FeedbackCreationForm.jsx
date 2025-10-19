import React, { useState, useEffect } from "react";
import { getProducts } from "../services/productApi";

export default function FeedbackCreationForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    text: "",
    channel: "web",
    product_id: "",
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
