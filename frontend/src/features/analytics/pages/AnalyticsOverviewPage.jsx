import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Layout from '../../../shared/components/Layout';

export default function AnalyticsOverviewPage() {
  return (
    <Layout variant="protected">
      <div className="p-8 space-y-12">
        <h1 className="text-5xl font-bold text-saru-cyan mb-8">Analytics Overview</h1>

        {/* Navigation Cards to Sub-Pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="users" className="group">
            <div className="bg-saru-black p-8 rounded-lg border border-saru-cyan/30 hover:border-saru-cyan transition duration-300 group-hover:scale-105">
              <h3 className="text-2xl font-bold text-saru-cyan mb-4">Users</h3>
              <p className="text-saru-teal mb-6">User behavior analysis</p>
              <div className="text-saru-cyan font-semibold group-hover:text-saru-teal transition duration-300">
                Explore →
              </div>
            </div>
          </Link>

          <Link to="company-performance" className="group">
            <div className="bg-saru-black p-8 rounded-lg border border-saru-cyan/30 hover:border-saru-cyan transition duration-300 group-hover:scale-105">
              <h3 className="text-2xl font-bold text-saru-cyan mb-4">Performance</h3>
              <p className="text-saru-teal mb-6">Company performance metrics</p>
              <div className="text-saru-cyan font-semibold group-hover:text-saru-teal transition duration-300">
                Explore →
              </div>
            </div>
          </Link>

          <Link to="products" className="group">
            <div className="bg-saru-black p-8 rounded-lg border border-saru-cyan/30 hover:border-saru-cyan transition duration-300 group-hover:scale-105">
              <h3 className="text-2xl font-bold text-saru-cyan mb-4">Products</h3>
              <p className="text-saru-teal mb-6">Product feedback analysis</p>
              <div className="text-saru-cyan font-semibold group-hover:text-saru-teal transition duration-300">
                Explore →
              </div>
            </div>
          </Link>

          <Link to="temporal" className="group">
            <div className="bg-saru-black p-8 rounded-lg border border-saru-cyan/30 hover:border-saru-cyan transition duration-300 group-hover:scale-105">
              <h3 className="text-2xl font-bold text-saru-cyan mb-4">Temporal</h3>
              <p className="text-saru-teal mb-6">Temporal analysis trends</p>
              <div className="text-saru-cyan font-semibold group-hover:text-saru-teal transition duration-300">
                Explore →
              </div>
            </div>
          </Link>
        </div>

        {/* Outlet for nested routes */}
        <Outlet />
      </div>
    </Layout>
  );
}
