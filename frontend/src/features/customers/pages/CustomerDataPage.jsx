import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api";
import { useAuth } from "../../auth/context";
import Layout from "../../../shared/components/Layout";

export default function CustomerDataPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
        const data = await getUsers();
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

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    if (!normalizedSearch) return true;
    const name = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();
    const mobile = (user.mobile || "").toLowerCase();
    return (
      name.includes(normalizedSearch) ||
      email.includes(normalizedSearch) ||
      mobile.includes(normalizedSearch)
    );
  });

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
          {!loading && !error && (
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or mobile..."
                className="w-full bg-saru-slate-dark text-saru-cyan border border-saru-cyan/30 rounded-lg px-4 py-2 focus:border-saru-cyan focus:outline-none"
              />
            </div>
          )}
          {loading ? (
            <div className="text-center py-10">
              <p className="text-saru-cyan/70">Loading customer data...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-400">Error: {error}</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-saru-cyan/70">
                {users.length === 0
                  ? "No customer data found."
                  : "No customers match your search."}
              </p>
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
                      Mobile
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-saru-cyan uppercase tracking-wider">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-saru-slate divide-y divide-saru-cyan/10">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-saru-cyan">
                        <Link
                          to={`/customers/${user.id}`}
                          className="underline decoration-saru-cyan/40 hover:decoration-saru-cyan"
                        >
                          {user.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-saru-cyan/80">
                        {user.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-saru-cyan/80">
                        {user.email?.trim() ? user.email : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-saru-cyan/80">
                        {user.mobile?.trim() ? user.mobile : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-saru-cyan/70">
                        {user.created_at
                          ? new Date(user.created_at).toLocaleString()
                          : "-"}
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

