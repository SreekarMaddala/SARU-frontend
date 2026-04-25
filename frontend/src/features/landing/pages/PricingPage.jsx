import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PricingPage() {
  const plans = [
    {
      id: 1,
      name: "Starter",
      price: "₹499/month",
      features: [
        "Up to 5 projects",
        "Basic analytics",
        "Email support",
      ],
    },
    {
      id: 2,
      name: "Professional",
      price: "₹1299/month",
      features: [
        "Up to 25 projects",
        "Advanced analytics",
        "Priority email support",
        "Team collaboration",
      ],
    },
    {
      id: 3,
      name: "Enterprise",
      price: "Contact Us",
      features: [
        "Unlimited projects",
        "Custom analytics",
        "Dedicated support",
        "Team & client management",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-saru-black to-black text-white p-8">
      {/* Navigation */}
      <nav className="mb-8">
        <Link to="/" className="text-saru-teal hover:underline text-lg font-semibold">
          ← Back to Home
        </Link>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-saru-cyan">Pricing Plans</h1>
        <p className="text-lg text-gray-300">
          Choose the plan that fits your needs and scale with us as your business grows.
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700"
          >
            <h2 className="text-2xl font-bold text-saru-teal mb-2">{plan.name}</h2>
            <p className="text-xl font-semibold mb-4">{plan.price}</p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-gray-300 before:content-['✓'] before:text-saru-teal before:mr-2">
                  {feature}
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-saru-teal text-black px-4 py-2 rounded-lg font-semibold w-full"
            >
              Choose Plan
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-500">
        <p>© {new Date().getFullYear()} SARU Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
}
