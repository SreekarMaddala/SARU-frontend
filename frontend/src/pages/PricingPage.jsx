import { Link } from 'react-router-dom';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-saru-black text-saru-cyan p-8">
      <nav className="mb-8">
        <Link to="/" className="text-saru-teal hover:underline">Back to Home</Link>
      </nav>
      <h1 className="text-4xl font-bold mb-4">Pricing</h1>
      <p className="text-lg">
        This is the Pricing page. Here you can find information about our pricing plans.
      </p>
    </div>
  );
}
