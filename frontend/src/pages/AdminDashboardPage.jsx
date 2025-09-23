import { useState } from "react";
import { useAdmin } from "../contexts/AdminContext";
import { Navigate } from "react-router-dom";
import AdminCompaniesTable from "../components/AdminCompaniesTable";
import CreateCompanyForm from "../components/CreateCompanyForm";

export default function AdminDashboardPage() {
  const { logout, isAuthenticated, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState("companies");

  // Redirect if not authenticated
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-saru-black text-saru-cyan">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleCompanyCreated = (newCompany) => {
    // Refresh the companies table when a new company is created
    setActiveTab("companies");
  };

  return (
    <div className="min-h-screen bg-saru-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark border-b border-saru-cyan/60 backdrop-blur-md shadow-lg">
        <div className="flex justify-between items-center p-8">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-4xl font-bold text-saru-black">Admin Dashboard</h1>
              <p className="text-sm text-saru-black/60">Manage companies and users</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("companies")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition duration-300 ${
                activeTab === "companies"
                  ? "border-saru-teal text-saru-cyan"
                  : "border-transparent text-saru-cyan/60 hover:text-saru-cyan hover:border-saru-cyan/60"
              }`}
            >
              Companies
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition duration-300 ${
                activeTab === "create"
                  ? "border-saru-teal text-saru-cyan"
                  : "border-transparent text-saru-cyan/60 hover:text-saru-cyan hover:border-saru-cyan/60"
              }`}
            >
              Create Company
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "companies" && (
            <div>
              <h2 className="text-2xl font-bold text-saru-cyan mb-4">All Companies</h2>
              <AdminCompaniesTable />
            </div>
          )}

          {activeTab === "create" && (
            <div>
              <CreateCompanyForm onCompanyCreated={handleCompanyCreated} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
