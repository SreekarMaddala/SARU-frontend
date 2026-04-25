import { useState } from "react";
import { useAuth } from "../../auth/context";
import { Link } from "react-router-dom";
import Layout from "../../../shared/components/Layout";

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

  return (
    <Layout variant="public">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-8 bg-saru-black text-white">
        <div className="container mx-auto grid grid-cols-2 grid-rows-2 gap-8 items-center py-16">
          {/* 1️⃣ GRID (Top Left) — Title, Text, Buttons */}
          <div className="space-y-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark text-transparent bg-clip-text leading-tight drop-shadow-lg">
              Soar with Insights 🦅
            </h1>

            <p className="text-lg text-saru-cyan/70 max-w-lg mx-auto">
              Harness eagle-eyed vision to capture, analyze, and act on feedback —
              elevating your strategies above the competition.
            </p>

            {isAuthenticated ? (
              <div className="flex justify-center space-x-4">
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-black font-semibold px-8 py-4 rounded-xl shadow-lg hover:from-saru-teal-dark hover:to-saru-teal transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/feedback"
                  className="border-2 border-saru-cyan text-saru-cyan font-semibold px-8 py-4 rounded-xl hover:bg-saru-cyan hover:text-saru-black transition shadow-lg"
                >
                  Feedback
                </Link>
              </div>
            ) : (
              <p className="text-saru-cyan/60 text-base">
                Login to explore advanced analytics and insights.
              </p>
            )}
          </div>

          {/* 2️⃣ GRID (Top Right) — Stats Card */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-xl">
              <div className="bg-saru-slate rounded-2xl p-10 shadow-2xl border border-saru-teal/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-saru-cyan/10 via-saru-teal/20 to-transparent blur-2xl animate-pulse"></div>
                <div className="relative z-10 space-y-6">
                  <div className="bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark h-4 rounded-full animate-pulse"></div>
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {[
                      { label: "Feedbacks", value: "12,430", status: "+15% MoM" },
                      { label: "NPS Score", value: "68", status: "↑ Strong" },
                      { label: "Positivity %", value: "72%", status: "↑ Healthy" },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-saru-slate-dark border border-saru-teal/30 shadow-md hover:shadow-saru-cyan/30 transition transform hover:scale-105"
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
          </div>

          {/* 3️⃣ GRID (Bottom Left) — Two Circular Images */}
          <div className="flex justify-center items-center gap-8">
            <img
              src="/msk-removebg-preview.png"
              alt="MSK Visual"
              className="w-[240px] h-[240px] rounded-full object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
            />
            <img
              src="/kavya-removebg-preview.png"
              alt="Kavya Visual"
              className="w-[240px] h-[240px] rounded-full object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* 4️⃣ GRID (Bottom Right) — Two Circular Images */}
          <div className="flex justify-center items-center gap-8">
            <img
              src="/ntr-removebg-preview.png"
              alt="NTR Visual"
              className="w-[240px] h-[240px] rounded-full object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
            />
            <img
              src="/tekkali-removebg-preview.png"
              alt="Tekkali Visual"
              className="w-[240px] h-[240px] rounded-full object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-saru-slate-dark to-black py-8 mt-16 border-t border-saru-cyan/20">
        <div className="container mx-auto text-center text-saru-cyan/80">
          <p>Built with 🦅 Vision · SARU Feedback Collector © 2025</p>
        </div>
      </footer>
    </Layout>
  );
}

