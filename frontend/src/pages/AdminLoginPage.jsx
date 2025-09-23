import { useState } from "react";
import { useAdmin } from "../contexts/AdminContext";
import { Navigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, isAuthenticated } = useAdmin();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (!result.success) {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-saru-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-saru-cyan mb-2">Admin Login</h2>
          <p className="text-saru-cyan/60">Sign in to access the admin dashboard</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-saru-cyan mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-saru-black border border-saru-cyan/30 rounded-md text-saru-cyan placeholder-saru-cyan/50 focus:outline-none focus:ring-2 focus:ring-saru-teal focus:border-transparent"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-saru-cyan mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-saru-black border border-saru-cyan/30 rounded-md text-saru-cyan placeholder-saru-cyan/50 focus:outline-none focus:ring-2 focus:ring-saru-teal focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-md p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-saru-teal text-saru-black py-2 px-4 rounded-md hover:bg-saru-teal-dark focus:outline-none focus:ring-2 focus:ring-saru-teal focus:ring-offset-2 focus:ring-offset-saru-black transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
