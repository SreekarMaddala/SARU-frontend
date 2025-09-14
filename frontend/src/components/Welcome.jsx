import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-8">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-16" />
          <h1 className="text-3xl font-bold">Welcome to Feedback Collector</h1>
        </div>
      </header>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="space-x-4">
            <Link
              to="/feedback-table"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              View Feedback Table
            </Link>
            <Link
              to="/dashboard"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
