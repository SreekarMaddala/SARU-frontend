import { useState, useEffect } from "react";
import { getProducts } from "../../products/api";
import { fetchFeedbacks } from "../api";
import ProductSection from "./ProductSection";
import ImportSection from "./ImportSection";
import FeedbackTable from "../../feedback/components/FeedbackTable";

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const loadFeedbacks = async () => {
    setLoading(true);
    try {
      const data = await fetchFeedbacks();
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

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-body p-8 space-y-12">
      <h1 className="text-5xl font-title font-bold text-primary-400 mb-8">
        Varshitha Feedback Dashboard
      </h1>

      <ProductSection
        products={products}
        onProductCreated={loadProducts}
        loading={loading}
      />

      <ImportSection onImportSuccess={loadFeedbacks} />

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
