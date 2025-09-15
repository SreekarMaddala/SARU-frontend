import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function Welcome() {
  const data = [
    { name: "Positive", value: 70 },
    { name: "Neutral", value: 20 },
    { name: "Negative", value: 10 },
  ];
  const COLORS = ["#00C49F", "#FFBB28", "#FF4444"];

  return (
    <div className="min-h-screen bg-saru-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-black via-saru-slate to-saru-black border-b border-saru-teal/40 backdrop-blur-md">
        <div className="flex justify-between items-center px-8 py-6">
          <div className="flex items-center space-x-4 group">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-16 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-saru-teal to-saru-cyan">
              Eagle Feedback Collector
            </h1>
          </div>
          <div className="hidden md:flex space-x-10 text-lg font-medium">
            <Link
              to="/dashboard"
              className="relative text-saru-cyan hover:text-saru-teal transition duration-300"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </Link>
            <Link
              to="/feedback-table"
              className="relative text-saru-cyan hover:text-saru-teal transition duration-300"
            >
              Feedback Table
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
            </Link>
            <a
              href="#"
              className="relative text-saru-cyan hover:text-saru-teal transition duration-300"
            >
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
          {/* Text */}
          <div>
            <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-saru-teal to-saru-cyan mb-6 leading-tight drop-shadow-lg">
              Soar with Insights 🦅
            </h2>
            <p className="text-xl text-saru-cyan/80 mb-8">
              Harness eagle-eyed vision to capture, analyze, and act on
              feedback—elevating your strategies above the competition.
            </p>
            <div className="space-x-4">
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-saru-teal to-saru-teal-dark text-saru-black px-8 py-4 rounded-xl font-semibold hover:from-saru-teal-dark hover:to-saru-teal transition duration-300 shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/feedback-table"
                className="border-2 border-saru-cyan text-saru-cyan px-8 py-4 rounded-xl font-semibold hover:bg-saru-cyan hover:text-saru-black transition duration-300 shadow-lg"
              >
                View Feedback
              </Link>
            </div>
          </div>

          {/* Futuristic Card with Metrics + Chart */}
          <div className="relative">
            <div className="bg-saru-slate rounded-2xl p-10 shadow-2xl border border-saru-teal/40 relative overflow-hidden group">
              {/* Feather-like background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-saru-teal/20 to-transparent animate-pulse blur-2xl"></div>

              {/* Floating feathers */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute w-3 h-3 bg-saru-teal rounded-full animate-bounce top-10 left-12 opacity-70"></div>
                <div className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-ping top-20 right-16 opacity-70"></div>
                <div className="absolute w-3 h-3 bg-saru-cyan rounded-full animate-bounce delay-200 bottom-12 left-1/3 opacity-70"></div>
              </div>

              <div className="space-y-6 relative z-10">
                {/* Futuristic header bar */}
                <div className="bg-gradient-to-r from-yellow-400 via-saru-teal to-saru-cyan h-5 rounded-full animate-pulse shadow-lg"></div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="p-4 rounded-xl bg-saru-slate-dark border border-saru-teal/30 shadow-md hover:shadow-saru-teal/40 transition transform hover:scale-105">
                    <p className="text-saru-teal-light text-xs">Feedbacks</p>
                    <h3 className="text-white font-bold text-lg">12,430</h3>
                    <span className="text-green-400 text-xs">+15% MoM</span>
                  </div>
                  <div className="p-4 rounded-xl bg-saru-slate-dark border border-saru-teal/30 shadow-md hover:shadow-saru-teal/40 transition transform hover:scale-105">
                    <p className="text-saru-teal-light text-xs">NPS Score</p>
                    <h3 className="text-white font-bold text-lg">68</h3>
                    <span className="text-green-400 text-xs">↑ Strong</span>
                  </div>
                  <div className="p-4 rounded-xl bg-saru-slate-dark border border-saru-teal/30 shadow-md hover:shadow-saru-teal/40 transition transform hover:scale-105">
                    <p className="text-saru-teal-light text-xs">
                      Positivity %
                    </p>
                    <h3 className="text-white font-bold text-lg">72%</h3>
                    <span className="text-green-400 text-xs">↑ Healthy</span>
                  </div>
                </div>

                {/* Mini Pie Chart */}
                <div className="mt-10 h-56">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={80}
                        label
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-saru-black-light py-8">
        <div className="container mx-auto px-8 text-center">
          <p className="text-saru-cyan">
            Built with 🦅 vision · Feedback Collector 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
