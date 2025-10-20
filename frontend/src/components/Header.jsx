import { Link } from 'react-router-dom';

export default function Header() {
  return (
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
          <Link to="/" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
          </Link>
          <Link to="/solutions" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
            Solutions
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
          </Link>
          <Link to="/pricing" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
          </Link>
          <Link to="/careers" className="text-saru-cyan hover:text-saru-teal transition duration-300 relative">
            Careers
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saru-teal transition-all duration-300 hover:w-full"></span>
          </Link>
        </div>
        <button className="md:hidden text-saru-cyan">☰</button>
      </div>
    </nav>
  );
}
