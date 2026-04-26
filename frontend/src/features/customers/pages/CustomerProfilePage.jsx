import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../../shared/components/Layout";
import { getCustomerProfile, getUsers } from "../api";

export default function CustomerProfilePage() {
  const { customerId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCustomerProfile(customerId);
        setProfile(data);
      } catch (apiError) {
        // Fallback for environments where profile endpoint is not ready yet.
        try {
          const users = await getUsers();
          const user = users.find((item) => String(item.id) === String(customerId));
          if (!user) {
            throw new Error("Customer not found");
          }
          setProfile(user);
        } catch (fallbackError) {
          setError(fallbackError.message || "Failed to load customer profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [customerId]);

  return (
    <Layout variant="protected">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-saru-cyan">Customer Profile</h1>
          <Link
            to="/customers"
            className="px-4 py-2 rounded-lg border border-saru-cyan/30 text-saru-cyan hover:bg-saru-cyan/10 transition"
          >
            Back to Customers
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-saru-cyan/70">Loading profile...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-400">{error}</div>
        ) : (
          <div className="bg-saru-slate rounded-2xl shadow-lg p-8 border border-saru-cyan/20 space-y-6">
            <div>
              <p className="text-saru-cyan/70 text-sm">Customer ID</p>
              <p className="text-2xl font-semibold text-saru-cyan">{profile?.id ?? "-"}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-saru-cyan/70 text-sm">Name</p>
                <p className="text-xl text-saru-cyan">{profile?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-saru-cyan/70 text-sm">Email</p>
                <p className="text-xl text-saru-cyan">
                  {profile?.email?.trim() ? profile.email : "-"}
                </p>
              </div>
              <div>
                <p className="text-saru-cyan/70 text-sm">Mobile</p>
                <p className="text-xl text-saru-cyan">
                  {profile?.mobile?.trim() ? profile.mobile : "-"}
                </p>
              </div>
              <div>
                <p className="text-saru-cyan/70 text-sm">Created At</p>
                <p className="text-xl text-saru-cyan">
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleString()
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
