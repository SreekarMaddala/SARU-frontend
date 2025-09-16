import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Welcome() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    // If already logged in, redirect to dashboard
    window.location.href = "/dashboard";
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.message || "Login failed.");
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-saru-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-saru-slate rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-extrabold text-saru-cyan mb-6 text-center">Login to SARU</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-saru-cyan mb-2 font-semibold">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-teal/30 rounded-lg px-4 py-2 focus:border-saru-teal focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-saru-cyan mb-2 font-semibold">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-teal/30 rounded-lg px-4 py-2 focus:border-saru-teal focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-cyan px-6 py-3 rounded-lg font-semibold hover:from-saru-teal-dark hover:to-saru-teal transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
