import { useState } from "react";
import { useAuth } from "../../auth/context";
import { Link } from "react-router-dom";
import Layout from "../../../shared/components/Layout";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import Hero3DScene from "../components/Hero3DScene";

export default function PageOne() {
  const { isAuthenticated, login, loginJSON, logout, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [useJSONLogin, setUseJSONLogin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    const result = useJSONLogin
      ? await loginJSON(email, password)
      : await login(email, password);
    if (!result.success) {
      setError(result.message || "Login failed.");
    } else {
      setShowLogin(false);
      window.location.href = "/dashboard";
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-saru-slate-dark to-black text-saru-cyan animate-pulse">
        Loading...
      </div>
    );

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <Layout variant="public">
      {/* Hero Section with 3D Background */}
      <section className="relative min-h-screen flex items-center px-8 bg-saru-black text-white overflow-hidden">
        {/* 3D Canvas Layer */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <Hero3DScene />
          </Canvas>
        </div>
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

        <motion.div 
          className="container mx-auto grid grid-cols-2 grid-rows-2 gap-8 items-center py-16 relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* 1️⃣ GRID (Top Left) — Title, Text, Buttons */}
          <motion.div className="space-y-8 text-center" variants={fadeInUp}>
            <h1 className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark text-transparent bg-clip-text leading-tight drop-shadow-lg">
              Soar with Insights 🦅
            </h1>

            <p className="text-lg text-saru-cyan/70 max-w-lg mx-auto backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-saru-teal/20">
              Harness eagle-eyed vision to capture, analyze, and act on feedback —
              elevating your strategies above the competition.
            </p>

            {isAuthenticated ? (
              <div className="flex justify-center space-x-4">
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-black font-semibold px-8 py-4 rounded-xl shadow-[0_0_15px_rgba(0,171,169,0.5)] hover:shadow-[0_0_25px_rgba(0,171,169,0.8)] transition duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  to="/feedback"
                  className="backdrop-blur-md bg-saru-cyan/10 border-2 border-saru-cyan text-saru-cyan font-semibold px-8 py-4 rounded-xl hover:bg-saru-cyan hover:text-saru-black transition duration-300 shadow-lg"
                >
                  Feedback
                </Link>
              </div>
            ) : (
              <p className="text-saru-cyan/60 text-base backdrop-blur-sm bg-black/20 inline-block p-2 rounded-lg">
                Login to explore advanced analytics and insights.
              </p>
            )}
          </motion.div>

          {/* 2️⃣ GRID (Top Right) — Stats Card */}
          <motion.div className="flex justify-center" variants={fadeInUp}>
            <div className="relative w-full max-w-xl">
              <div className="backdrop-blur-md bg-saru-slate/40 rounded-2xl p-10 shadow-[0_0_30px_rgba(0,171,169,0.15)] border border-saru-teal/40 relative overflow-hidden group hover:border-saru-cyan/60 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-saru-cyan/10 via-saru-teal/10 to-transparent blur-2xl group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 space-y-6">
                  <div className="bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark h-4 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.5)]"></div>
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {[
                      { label: "Feedbacks", value: "12,430", status: "+15% MoM" },
                      { label: "NPS Score", value: "68", status: "↑ Strong" },
                      { label: "Positivity %", value: "72%", status: "↑ Healthy" },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-saru-teal/30 shadow-md hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition transform hover:-translate-y-1 duration-300"
                      >
                        <p className="text-saru-teal-light text-xs">{stat.label}</p>
                        <h3 className="text-white font-bold text-lg">{stat.value}</h3>
                        <span className="text-saru-cyan text-xs">{stat.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3️⃣ GRID (Bottom Left) — Two Circular Images */}
          <motion.div className="flex justify-center items-center gap-8" variants={fadeInUp}>
            <div className="relative group">
              <div className="absolute inset-0 bg-saru-cyan rounded-full blur-xl opacity-20 group-hover:opacity-50 transition duration-500"></div>
              <img
                src="/msk-removebg-preview.png"
                alt="MSK Visual"
                className="relative w-[240px] h-[240px] rounded-full object-cover shadow-[0_0_20px_rgba(0,171,169,0.3)] hover:scale-105 transition-transform duration-500 border-2 border-transparent hover:border-saru-cyan/50"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-saru-cyan rounded-full blur-xl opacity-20 group-hover:opacity-50 transition duration-500"></div>
              <img
                src="/kavya-removebg-preview.png"
                alt="Kavya Visual"
                className="relative w-[240px] h-[240px] rounded-full object-cover shadow-[0_0_20px_rgba(0,171,169,0.3)] hover:scale-105 transition-transform duration-500 border-2 border-transparent hover:border-saru-cyan/50"
              />
            </div>
          </motion.div>

          {/* 4️⃣ GRID (Bottom Right) — Two Circular Images */}
          <motion.div className="flex justify-center items-center gap-8" variants={fadeInUp}>
            <div className="relative group">
              <div className="absolute inset-0 bg-saru-teal rounded-full blur-xl opacity-20 group-hover:opacity-50 transition duration-500"></div>
              <img
                src="/ntr-removebg-preview.png"
                alt="NTR Visual"
                className="relative w-[240px] h-[240px] rounded-full object-cover shadow-[0_0_20px_rgba(0,171,169,0.3)] hover:scale-105 transition-transform duration-500 border-2 border-transparent hover:border-saru-teal/50"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-saru-teal rounded-full blur-xl opacity-20 group-hover:opacity-50 transition duration-500"></div>
              <img
                src="/tekkali-removebg-preview.png"
                alt="Tekkali Visual"
                className="relative w-[240px] h-[240px] rounded-full object-cover shadow-[0_0_20px_rgba(0,171,169,0.3)] hover:scale-105 transition-transform duration-500 border-2 border-transparent hover:border-saru-teal/50"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-saru-slate-dark to-black py-8 border-t border-saru-cyan/20 relative z-10">
        <div className="container mx-auto text-center text-saru-cyan/80">
          <p>Built with 🦅 Vision · SARU Feedback Collector © 2025</p>
        </div>
      </footer>
    </Layout>
  );
}

