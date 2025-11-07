import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Chart from './components/Chart';
import AuthModal from './components/AuthModal';
import { Dashboard, Deposit, Withdraw, Transactions, Account, Tournaments } from './components/Pages';

function useSimulatedSeries() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // initialize with 120 points
    const init = Array.from({ length: 120 }, (_, i) => 100 + Math.sin(i / 6) * 2 + (Math.random() - 0.5) * 1.5);
    setData(init);
    const id = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1] ?? 100;
        const next = last + (Math.random() - 0.5) * 1.2;
        const arr = [...prev.slice(-119), Math.max(80, Math.min(120, next))];
        return arr;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return data;
}

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const series = useSimulatedSeries();

  const chartBlock = useMemo(() => (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-semibold">EUR/USD</div>
          <div className="text-xs text-gray-500">Live price simulation</div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-0.5 rounded bg-green-100 text-green-700">80% Payout</span>
          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">1m</span>
          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700">5m</span>
        </div>
      </div>
      <Chart data={series} />
    </div>
  ), [series]);

  const handleLoginClick = () => setAuthOpen(true);
  const handleLogin = (u) => setUser(u);
  const handleLogout = () => setUser(null);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar currentPage={page} setPage={setPage} user={user} onLoginClick={handleLoginClick} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {page === 'dashboard' && <Dashboard series={chartBlock} />}
        {page === 'deposit' && <Deposit />}
        {page === 'withdraw' && <Withdraw />}
        {page === 'transactions' && <Transactions />}
        {page === 'tournaments' && <Tournaments />}
        {page === 'account' && <Account user={user} />}
      </main>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onLogin={handleLogin} />

      <footer className="py-8 text-center text-xs text-gray-500">
        <div>TANIX — inspired by Quotex. For demo purposes only.</div>
      </footer>
    </div>
  );
}
