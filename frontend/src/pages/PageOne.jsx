import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-saru-slate-dark to-black text-saru-cyan">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark border-b border-saru-cyan/50 shadow-lg backdrop-blur-lg">
        <div className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center space-x-4 group">
            <img
              src="/logo - Copy.png"
              alt="Logo"
              className="h-16 w-20 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
            <img src="/text.png" alt="SARU text" className="ml-6 h-10 transition-transform duration-500 group-hover:scale-105" />
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center space-x-6 font-medium">
            <Link to="/pricing" className="hover:text-white transition duration-300">
              Pricing
            </Link>
            <Link to="/solutions" className="hover:text-white transition duration-300">
              Solutions
            </Link>
            <Link to="/careers" className="hover:text-white transition duration-300">
              Careers
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-white transition duration-300">
                  Dashboard
                </Link>
                <Link to="/feedback-table" className="hover:text-white transition duration-300">
                  Feedback
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowLogin(!showLogin)}
                  className="bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-black font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Login
                </button>

                {/* Login dropdown */}
                {showLogin && (
                  <div className="absolute top-full right-0 mt-3 w-80 bg-saru-slate border border-saru-cyan/30 rounded-xl p-6 shadow-2xl animate-fadeIn backdrop-blur-md">
                    <h3 className="text-xl font-semibold text-saru-cyan mb-4">
                      Login to SARU
                    </h3>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          id="useJSON"
                          type="checkbox"
                          checked={useJSONLogin}
                          onChange={(e) => setUseJSONLogin(e.target.checked)}
                          className="w-4 h-4 text-saru-teal bg-saru-slate-dark border border-saru-cyan/30 rounded focus:ring-saru-teal"
                        />
                        <label htmlFor="useJSON" className="text-sm text-saru-cyan/80">
                          Use JSON Login
                        </label>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm text-saru-cyan/80 mb-1">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-teal/30 rounded-lg px-3 py-2 focus:outline-none focus:border-saru-teal"
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-sm text-saru-cyan/80 mb-1">
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-teal/30 rounded-lg px-3 py-2 focus:outline-none focus:border-saru-teal"
                        />
                      </div>
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-black font-semibold px-4 py-2 rounded-lg hover:shadow-lg transition"
                      >
                        Login ({useJSONLogin ? "JSON" : "Form"})
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
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
            to="/feedback-table"
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
    </div>
  );
}
