import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function CareersPage() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      location: "Bangalore, India",
      type: "Full-time",
      description:
        "Work with React, Tailwind, and modern UI libraries to build scalable web apps.",
    },
    {
      id: 2,
      title: "Backend Engineer",
      location: "Pune, India",
      type: "Full-time",
      description:
        "Design APIs, manage databases, and build robust server-side services.",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Remote",
      type: "Contract",
      description:
        "Craft seamless user experiences with modern design tools and research.",
    },
  ];

  const [eagleData, setEagleData] = useState(null);

  useEffect(() => {
    fetch("https://assets10.lottiefiles.com/packages/lf20_Zg7lQ3.json")
      .then((res) => res.json())
      .then((data) => setEagleData(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-saru-black to-black text-white p-8">
      {/* Navigation */}
      <nav className="mb-10 flex justify-between items-center">
        <Link
          to="/"
          className="text-saru-teal hover:underline text-lg font-semibold"
        >
          ← Back to Home
        </Link>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl font-bold text-saru-cyan"
        >
          Join Our Team 🚀
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Careers at <span className="text-saru-teal">SARU</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Be part of a passionate team that’s shaping the future of technology.
            Explore roles, bring your ideas to life, and grow with us.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-saru-teal text-black px-6 py-3 rounded-2xl font-semibold shadow-lg"
          >
            View Open Positions
          </motion.button>
        </motion.div>

        {/* Eagle Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-80 flex justify-center items-center"
        >
          {eagleData ? (
            <Lottie animationData={eagleData} loop={true} />
          ) : (
            <p className="text-white">🦅 Loading Eagle...</p>
          )}
        </motion.div>
      </div>

      {/* Job Listings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="grid md:grid-cols-3 gap-8"
      >
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700"
          >
            <h2 className="text-2xl font-bold text-saru-teal mb-2">
              {job.title}
            </h2>
            <p className="text-sm text-gray-400 mb-2">
              {job.location} • {job.type}
            </p>
            <p className="text-gray-300 mb-4">{job.description}</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-saru-cyan text-black px-4 py-2 rounded-lg font-semibold"
            >
              Apply Now
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-500">
        <p>© {new Date().getFullYear()} SARU Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
}
