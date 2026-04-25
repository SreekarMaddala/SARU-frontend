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
  { to: "/feedback", label: "Feedback" },
  { to: "/customers", label: "Customers" },
  { to: "/products", label: "Products" },
];

export default function Header({ variant = "public" }) {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const isActive = (path) => {
    if (path === "/analytics") {
      return location.pathname.startsWith("/analytics");
    }
    return location.pathname === path;
  };

  const links = variant === "public" ? publicLinks : protectedLinks;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-saru-cyan via-saru-teal to-saru-teal-dark border-b border-saru-cyan/60 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center space-x-4 group">
          <img
            src="/logo - Copy.png"
            alt="SARU Logo"
            className="h-10 transform transition-transform duration-300 group-hover:scale-110"
          />
          <div>
            <h1 className="text-2xl font-bold text-saru-black">SARU</h1>
            <p className="text-sm text-saru-black/60">feedback collector</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-saru-black font-medium transition duration-300 ${
                isActive(link.to)
                  ? "text-saru-black font-bold"
                  : "hover:text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-saru-black transition-all duration-300 ${
                  isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          {variant === "public" && (
            <div className="flex items-center gap-3">
              <Link to="/company/login">
                <Button variant="primary" size="sm">
                  Company Login
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button variant="ghost" size="sm">
                  Admin
                </Button>
              </Link>
            </div>
          )}

          {isAuthenticated && variant !== "public" && (
            <Button variant="danger" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-saru-black text-2xl" aria-label="Menu">
          ☰
        </button>
      </div>
    </nav>
  );
}

