import { useState, useEffect } from "react";
import { getUsers } from "../api";
import { useAuth } from "../../auth/context";
import Layout from "../../../shared/components/Layout";

export default function CustomerDataPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Customers | SARU";
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setError("Please login to view customer data");
        setLoading(false);
        return;
      }

      try {
        const data = await getUsers(token);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <Layout variant="protected">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-saru-cyan">Customers</h1>
          <p className="mt-2 text-saru-cyan/70">
            View and manage customer information from the database.
          </p>
        </div>

        <div className="bg-saru-slate rounded-2xl shadow-lg p-6 border border-saru-cyan/20">
          {loading ? (
            <div className="text-center py-10">
              <p className="text-saru-cyan/70">Loading customer data...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-400">Error: {error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-saru-cyan/20">
                <thead className="bg-saru-slate-dark">
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
                  </tr>
                </thead>
                <tbody className="bg-saru-slate divide-y divide-saru-cyan/10">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-saru-cyan">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-saru-cyan/80">
                        {user.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-saru-cyan/80">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-saru-cyan/70">
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

