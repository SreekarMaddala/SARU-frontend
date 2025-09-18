import React from 'react';
import { Link } from 'react-router-dom';

const solutions = [
  { title: 'Analytics', description: 'Powerful insights into your business.' },
  { title: 'Automation', description: 'Automate repetitive tasks efficiently.' },
  { title: 'Collaboration', description: 'Seamless team communication.' },
  { title: 'Security', description: 'Top-notch data protection.' },
];

const SolutionsPage = () => {
  return (
    <div className="min-h-screen bg-saru-black text-saru-cyan">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 border-b border-saru-cyan/30">
        <h1 className="text-2xl font-bold">SARU Solutions</h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link to="/pricing" className="hover:text-white">Pricing</Link>
          <Link to="/careers" className="hover:text-white">Careers</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">Our Solutions</h2>
        <p className="text-saru-cyan/80 max-w-2xl mx-auto">
          Explore the services we provide to empower your business and streamline your workflows.
        </p>
      </section>

      {/* Solutions Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-16">
        {solutions.map((sol, idx) => (
          <div key={idx} className="bg-saru-cyan/10 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">{sol.title}</h3>
            <p className="text-saru-cyan/70">{sol.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SolutionsPage;
