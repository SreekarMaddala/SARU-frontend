import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-saru-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-saru-black bg-opacity-90 backdrop-blur-sm">
        <div className="flex justify-between items-center p-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-4">
              <img src="/logo.png" alt="Logo" className="h-24" />
              <h1 className="text-3xl font-bold text-saru-cyan">Feedback Collector</h1>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <span className="text-saru-teal font-semibold">Dashboard</span>
            <Link to="/feedback-table" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
              Feedback Table
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </Link>
            <a href="#" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </a>
          </div>
          <button className="md:hidden text-saru-cyan">☰</button>
        </div>
      </nav>
      <Dashboard />
    </div>
  );
}
