import Dashboard from '../components/Dashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-8">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-16" />
        </div>
      </header>
      <Dashboard />
    </div>
  );
}
