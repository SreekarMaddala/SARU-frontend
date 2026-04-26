import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../products/api";
import { fetchFeedbacks } from "../api";

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [feedbackData, productData] = await Promise.all([
        fetchFeedbacks(),
        getProducts(),
      ]);
      setFeedbacks(feedbackData);
      setProducts(productData);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const summaryCards = [
    {
      title: "Users",
      description: "User behavior analysis",
      value: loading ? "..." : `${new Set(feedbacks.map((f) => f.user_id)).size}`,
      link: "/analytics/users",
      color: "border-saru-cyan/30",
    },
    {
      title: "Performance",
      description: "Company performance metrics",
      value: loading ? "..." : `${feedbacks.length}`,
      link: "/analytics/company-performance",
      color: "border-green-400/30",
    },
    {
      title: "Products",
      description: "Product feedback analysis",
      value: loading ? "..." : `${products.length}`,
      link: "/analytics/products",
      color: "border-blue-400/30",
    },
    {
      title: "Temporal",
      description: "Temporal analysis trends",
      value: loading ? "..." : `${feedbacks.length}`,
      link: "/analytics/temporal",
      color: "border-purple-400/30",
    },
    {
      title: "Retention",
      description: "Customer retention analytics",
      value: loading ? "..." : `${new Set(feedbacks.map((f) => f.user_id)).size}`,
      link: "/analytics/retention",
      color: "border-amber-400/30",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-saru-cyan">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {summaryCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="group block bg-saru-black-light p-6 rounded-xl border hover:scale-105 transition duration-300 shadow-lg"
            style={{ borderColor: card.color.replace("/30", "/60") }}
          >
            <h3 className="text-xl font-bold text-saru-cyan mb-2">
              {card.title}
            </h3>
            <p className="text-3xl font-extrabold text-saru-teal mb-2">
              {card.value}
            </p>
            <p className="text-sm text-saru-cyan/70">{card.description}</p>
            <div className="mt-4 text-saru-cyan font-semibold group-hover:text-saru-teal transition duration-300">
              Explore →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

