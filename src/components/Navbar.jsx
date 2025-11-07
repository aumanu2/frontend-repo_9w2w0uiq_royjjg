import React from 'react';
import { Home, DollarSign, ArrowDownCircle, ListOrdered, Trophy, User } from 'lucide-react';

const NavButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
      ${active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}
    `}
  >
    <Icon size={18} />
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export default function Navbar({ currentPage, setPage, user, onLoginClick, onLogout }) {
  return (
    <div className="w-full border-b bg-white sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded bg-blue-600 text-white grid place-items-center font-bold">T</div>
          <div>
            <div className="text-lg font-bold tracking-wide">TANIX</div>
            <div className="text-xs text-gray-500 -mt-1">Binary Trading Platform</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <NavButton icon={Home} label="Dashboard" active={currentPage === 'dashboard'} onClick={() => setPage('dashboard')} />
          <NavButton icon={DollarSign} label="Deposit" active={currentPage === 'deposit'} onClick={() => setPage('deposit')} />
          <NavButton icon={ArrowDownCircle} label="Withdraw" active={currentPage === 'withdraw'} onClick={() => setPage('withdraw')} />
          <NavButton icon={ListOrdered} label="Transactions" active={currentPage === 'transactions'} onClick={() => setPage('transactions')} />
          <NavButton icon={Trophy} label="Tournaments" active={currentPage === 'tournaments'} onClick={() => setPage('tournaments')} />
          <NavButton icon={User} label="Account" active={currentPage === 'account'} onClick={() => setPage('account')} />
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="text-sm text-gray-600 hidden sm:block">Hi, <span className="font-semibold">{user.name}</span></div>
              <button onClick={onLogout} className="px-3 py-2 rounded-md bg-gray-900 text-white text-sm">Logout</button>
            </>
          ) : (
            <button onClick={onLoginClick} className="px-3 py-2 rounded-md bg-gray-900 text-white text-sm">Login</button>
          )}
        </div>
      </div>
    </div>
  );
}
