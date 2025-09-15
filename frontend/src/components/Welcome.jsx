import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-saru-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-saru-black bg-opacity-90 backdrop-blur-sm">
        <div className="flex justify-between items-center p-8">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Logo" className="h-24" />
            <h1 className="text-3xl font-bold text-saru-cyan">Feedback Collector</h1>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/dashboard" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </Link>
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-6xl font-bold text-saru-cyan mb-6 leading-tight">
              Collect, Analyze, and Act on Feedback
            </h2>
            <p className="text-xl text-saru-cyan mb-8">
              Transform customer insights into actionable strategies with our powerful feedback management platform.
            </p>
            <div className="space-x-4">
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-cyan px-8 py-4 rounded-lg font-semibold hover:from-saru-teal-dark hover:to-saru-teal transition duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/feedback-table"
                className="border-2 border-saru-cyan text-saru-cyan px-8 py-4 rounded-lg font-semibold hover:bg-saru-cyan hover:text-saru-black transition duration-300"
              >
                View Feedback
              </Link>
            </div>
          </div>
          <div className="relative">
            {/* Placeholder for futuristic illustration */}
            <div className="bg-saru-slate rounded-lg p-8 shadow-2xl border border-saru-teal/20">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-saru-teal to-saru-teal-dark h-4 rounded animate-pulse"></div>
                <div className="bg-saru-slate-dark h-4 rounded w-3/4"></div>
                <div className="bg-saru-slate-dark h-4 rounded w-1/2"></div>
                <div className="flex space-x-2 mt-6">
                  <div className="bg-saru-teal w-8 h-8 rounded-full animate-bounce"></div>
                  <div className="bg-saru-teal w-8 h-8 rounded-full animate-bounce delay-100"></div>
                  <div className="bg-saru-teal w-8 h-8 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-8">
          <h3 className="text-4xl font-bold text-saru-cyan mb-12 text-center">Powerful Import Options</h3>
          <div className="overflow-x-auto">
            <div className="flex space-x-6 pb-4">
              <div className="bg-saru-slate rounded-lg p-6 min-w-[300px] hover:bg-saru-slate-dark hover:shadow-saru-teal/20 hover:scale-105 transition-all duration-300 cursor-pointer border border-saru-teal/10">
                <h4 className="text-2xl font-semibold text-saru-cyan mb-4">CSV Upload</h4>
                <p className="text-saru-cyan">Import feedback from CSV files with ease.</p>
              </div>
              <div className="bg-saru-slate rounded-lg p-6 min-w-[300px] hover:bg-saru-slate-dark hover:shadow-saru-teal/20 hover:scale-105 transition-all duration-300 cursor-pointer border border-saru-teal/10">
                <h4 className="text-2xl font-semibold text-saru-cyan mb-4">Google Sheets</h4>
                <p className="text-saru-cyan">Connect and import from Google Forms responses.</p>
              </div>
              <div className="bg-saru-slate rounded-lg p-6 min-w-[300px] hover:bg-saru-slate-dark hover:shadow-saru-teal/20 hover:scale-105 transition-all duration-300 cursor-pointer border border-saru-teal/10">
                <h4 className="text-2xl font-semibold text-saru-cyan mb-4">Twitter Analysis</h4>
                <p className="text-saru-cyan">Capture and analyze social media mentions.</p>
              </div>
              <div className="bg-saru-slate rounded-lg p-6 min-w-[300px] hover:bg-saru-slate-dark hover:shadow-saru-teal/20 hover:scale-105 transition-all duration-300 cursor-pointer border border-saru-teal/10">
                <h4 className="text-2xl font-semibold text-saru-cyan mb-4">Email Parsing</h4>
                <p className="text-saru-cyan">Automatically extract feedback from emails.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-saru-black-light py-8">
        <div className="container mx-auto px-8 text-center">
          <div className="flex justify-center space-x-8 mb-4">
            <a href="#" className="text-saru-cyan hover:text-saru-teal transition duration-300">About</a>
            <a href="#" className="text-saru-cyan hover:text-saru-teal transition duration-300">Terms</a>
            <a href="#" className="text-saru-cyan hover:text-saru-teal transition duration-300">Privacy</a>
            <a href="#" className="text-saru-cyan hover:text-saru-teal transition duration-300">Contact</a>
          </div>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-saru-cyan hover:text-saru-teal transition duration-300">📘</a>
            <a href="#" className="text-saru-cyan hover:text-saru-teal transition duration-300">🐦</a>
            <a href="#" className="text-saru-cyan hover:text-saru-teal transition duration-300">📧</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
