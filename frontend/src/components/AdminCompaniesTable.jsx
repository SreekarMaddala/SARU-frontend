import { useState, useEffect } from "react";
import adminApi from "../services/adminApi";

export default function AdminCompaniesTable({ onEdit, onDelete }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await adminApi.get("/admin/companies");
      setCompanies(response.data);
      setError("");
    } catch (error) {
      setError("Failed to fetch companies");
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (companyId) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await adminApi.delete(`/admin/companies/${companyId}`);
        setCompanies(companies.filter(company => company.id !== companyId));
        if (onDelete) onDelete(companyId);
      } catch (error) {
        setError("Failed to delete company");
        console.error("Error deleting company:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-saru-cyan">Loading companies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-md p-4 mb-4">
        <p className="text-red-400">{error}</p>
        <button
          onClick={fetchCompanies}
          className="mt-2 text-saru-teal hover:text-saru-cyan transition duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-saru-black/50 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-saru-teal/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-saru-cyan uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-saru-cyan uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-saru-cyan uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-saru-cyan uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-saru-cyan uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-saru-cyan/10">
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-saru-teal/5">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-saru-cyan">
                  {company.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-saru-cyan">
                  {company.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-saru-cyan">
                  {company.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-saru-cyan">
                  {new Date(company.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => onEdit && onEdit(company)}
                    className="text-saru-teal hover:text-saru-cyan transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(company.id)}
                    className="text-red-400 hover:text-red-300 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {companies.length === 0 && (
        <div className="text-center py-8 text-saru-cyan/60">
          No companies found
        </div>
      )}
    </div>
  );
}
