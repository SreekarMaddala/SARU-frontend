import { useState } from "react";
import adminApi from "../services/adminApi";

export default function CreateCompanyForm({ onCompanyCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await adminApi.post("/admin/companies", formData);

      if (response.status === 200 || response.status === 201) {
        setSuccess("Company created successfully!");
        setFormData({ name: "", email: "", password: "" });

        if (onCompanyCreated) {
          onCompanyCreated(response.data);
        }
      }
    } catch (error) {
      const message = error.response?.data?.detail || "Failed to create company";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-saru-black/50 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-saru-cyan mb-4">Create New Company</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-saru-cyan mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-saru-black border border-saru-cyan/30 rounded-md text-saru-cyan placeholder-saru-cyan/50 focus:outline-none focus:ring-2 focus:ring-saru-teal focus:border-transparent"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-saru-cyan mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-saru-black border border-saru-cyan/30 rounded-md text-saru-cyan placeholder-saru-cyan/50 focus:outline-none focus:ring-2 focus:ring-saru-teal focus:border-transparent"
            placeholder="company@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-saru-cyan mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-saru-black border border-saru-cyan/30 rounded-md text-saru-cyan placeholder-saru-cyan/50 focus:outline-none focus:ring-2 focus:ring-saru-teal focus:border-transparent"
            placeholder="Enter password"
          />
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-md p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-md p-3">
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-saru-teal text-saru-black py-2 px-4 rounded-md hover:bg-saru-teal-dark focus:outline-none focus:ring-2 focus:ring-saru-teal focus:ring-offset-2 focus:ring-offset-saru-black transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Company"}
        </button>
      </form>
    </div>
  );
}
