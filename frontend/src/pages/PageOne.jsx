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
      <div className="min-h-screen flex items-center justify-center bg-saru-black text-saru-cyan">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-saru-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark border-b border-saru-cyan/60 backdrop-blur-md shadow-lg">
        <div className="flex justify-between items-center px-8 py-3">
          <div className="flex items-center space-x-4 group">
            <img
              src="/logo - Copy.png"
              alt="Logo"
              className="h-20 w-14 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
            <img src="/text.png" alt="SARU text" className="ml-8 h-10" />
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/pricing"
              className="text-saru-cyan hover:text-saru-teal transition duration-300"
            >
              Pricing
            </Link>
            <Link
              to="/solutions"
              className="text-saru-cyan hover:text-saru-teal transition duration-300"
            >
              Solutions
            </Link>
            <Link
              to="/careers"
              className="text-saru-cyan hover:text-saru-teal transition duration-300"
            >
              Careers
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-saru-cyan hover:text-saru-teal transition duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  to="/feedback-table"
                  className="text-saru-cyan hover:text-saru-teal transition duration-300"
                >
                  Feedback Table
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowLogin(!showLogin)}
                  className="bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-cyan px-6 py-3 rounded-xl font-semibold hover:from-saru-teal-dark hover:to-saru-teal transition duration-300"
                >
                  Login
                </button>
                {showLogin && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-saru-slate rounded-xl p-6 shadow-lg border border-saru-teal/30">
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
                          className="w-4 h-4 text-saru-teal bg-saru-slate-dark border border-saru-teal/30 rounded focus:ring-saru-teal focus:ring-2"
                        />
                        <label
                          htmlFor="useJSON"
                          className="text-saru-cyan text-sm"
                        >
                          Use JSON Login
                        </label>
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-saru-cyan mb-1 text-sm"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-teal/30 rounded-lg px-3 py-2 focus:border-saru-teal focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-saru-cyan mb-1 text-sm"
                        >
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-teal/30 rounded-lg px-3 py-2 focus:border-saru-teal focus:outline-none"
                          required
                        />
                      </div>
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-cyan px-4 py-2 rounded-lg font-semibold hover:from-saru-teal-dark hover:to-saru-teal transition duration-300"
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
      <section className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div>
            <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark mb-6 leading-tight drop-shadow-lg">
              Soar with Insights 🦅
            </h2>
            <p className="text-xl text-saru-cyan/80 mb-8">
              Harness eagle-eyed vision to capture, analyze, and act on feedback—
              elevating your strategies above the competition.
            </p>
            {isAuthenticated ? (
              <div className="space-x-4">
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-black px-8 py-4 rounded-xl font-semibold hover:from-saru-teal-dark hover:to-saru-teal transition duration-300 shadow-lg"
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/feedback-table"
                  className="border-2 border-saru-cyan text-saru-cyan px-8 py-4 rounded-xl font-semibold hover:bg-saru-cyan hover:text-saru-black transition duration-300 shadow-lg"
                >
                  View Feedback
                </Link>
              </div>
            ) : (
              <p className="text-lg text-saru-cyan/60">
                Login to access the dashboard and feedback tools.
              </p>
            )}
          </div>

          {/* Futuristic Image Section */}
          <div className="relative flex justify-center items-center">
            <div className="relative group">
              <img
                src="/vignesh.png"
                alt="SARU Solutions Professional Display"
                className="rounded-2xl shadow-2xl border border-saru-cyan/40 w-full max-w-md mx-auto transform hover:scale-105 transition-all duration-700 animate-fadeIn"
              />
              {/* Glowing Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-saru-cyan/10 via-saru-teal/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-700 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-saru-black-light py-8">
        <div className="container mx-auto px-8 text-center">
          <p className="text-saru-cyan">
            Built with 🦅 vision · Feedback Collector 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
