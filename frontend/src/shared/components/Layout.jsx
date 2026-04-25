import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/context";
import Button from "./Button";

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/pricing", label: "Pricing" },
  { to: "/careers", label: "Careers" },
];

const protectedLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/analytics", label: "Analytics" },
  { to: "/feedback-table", label: "Feedback Table" },
  { to: "/customer-data", label: "Customer Data" },
  { to: "/products", label: "Products" },
];

export default function Layout({ children, variant = "public" }) {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-saru-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark border-b border-saru-cyan/60 backdrop-blur-md shadow-lg">
        <div className="flex justify-between items-center p-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-4">
              <img src="/logo - Copy.png" alt="Logo" className="h-10" />
              <div>
                <h1 className="text-2xl font-bold text-saru-cyan">SARU</h1>
                <p className="text-sm text-saru-cyan/60">feedback collector</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {variant === "public" &&
              publicLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-saru-cyan hover:text-saru-teal transition duration-300 relative ${isActive(link.to) ? "font-semibold" : ""}`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
                </Link>
              ))}

            {variant === "protected" &&
              protectedLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-saru-cyan hover:text-saru-teal transition duration-300 relative ${isActive(link.to) ? "font-semibold text-saru-teal" : ""}`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
                </Link>
              ))}

            {isAuthenticated && variant === "protected" && (
              <Button variant="danger" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>

          <button className="md:hidden text-saru-cyan">☰</button>
        </div>
      </nav>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}

