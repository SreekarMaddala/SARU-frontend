import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import Layout from "../../../shared/components/Layout";

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
    <Layout variant="public">
      <div className="space-y-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-extrabold mb-6 leading-tight text-saru-cyan">
              Careers at <span className="text-saru-teal">SARU</span>
            </h1>
            <p className="text-lg text-saru-cyan/70 mb-6">
              Be part of a passionate team that’s shaping the future of
              technology. Explore roles, bring your ideas to life, and grow with
              us.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-saru-teal text-saru-black px-6 py-3 rounded-2xl font-semibold shadow-lg"
            >
              View Open Positions
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-80 flex justify-center items-center"
          >
            {eagleData ? (
              <Lottie animationData={eagleData} loop={true} />
            ) : (
              <p className="text-saru-cyan">🦅 Loading Eagle...</p>
            )}
          </motion.div>
        </div>

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
              className="bg-saru-slate rounded-2xl p-6 shadow-lg border border-saru-cyan/20"
            >
              <h2 className="text-2xl font-bold text-saru-teal mb-2">
                {job.title}
              </h2>
              <p className="text-sm text-saru-cyan/60 mb-2">
                {job.location} • {job.type}
              </p>
              <p className="text-saru-cyan/80 mb-4">{job.description}</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-saru-cyan text-saru-black px-4 py-2 rounded-lg font-semibold"
              >
                Apply Now
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
}
