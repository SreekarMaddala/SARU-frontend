import { useState } from "react";
import { useAuth } from "../context";
import { Link } from "react-router-dom";
import Button from "../../../shared/components/Button";

export default function CompanyLoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.message);
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-saru-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-saru-cyan mb-2">Company Login</h2>
          <p className="text-saru-cyan/60">Sign in to access your dashboard</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
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
                placeholder="company@example.com"
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

          <Button type="submit" variant="primary" size="md" loading={pending} className="w-full">
            {pending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center">
          <Link to="/admin/login" className="text-saru-teal hover:text-saru-cyan transition duration-300 text-sm">
            Admin Login →
          </Link>
        </div>
      </div>
    </div>
  );
}
