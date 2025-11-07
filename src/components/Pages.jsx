import React from 'react';

export function Dashboard({ series }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-3">
        {series}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Balance', value: '$5,000' },
            { label: 'Profit Today', value: '+$320' },
            { label: 'Win Rate', value: '63%' },
          ].map((s) => (
            <div key={s.label} className="bg-white border rounded-lg p-4">
              <div className="text-sm text-gray-500">{s.label}</div>
              <div className="text-lg font-semibold">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="bg-white border rounded-lg p-4">
          <div className="font-semibold mb-2">Assets</div>
          <ul className="space-y-2 text-sm">
            {['EUR/USD', 'BTC/USD', 'ETH/USD', 'AAPL', 'TSLA'].map((a) => (
              <li key={a} className="flex items-center justify-between">
                <span>{a}</span>
                <span className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-700">UP 80%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="font-semibold mb-2">Quick Trade</div>
          <div className="flex items-center gap-2">
            <input className="flex-1 border rounded px-2 py-1" placeholder="$ Amount" />
            <button className="px-3 py-1.5 rounded bg-green-600 text-white text-sm">Buy</button>
            <button className="px-3 py-1.5 rounded bg-red-600 text-white text-sm">Sell</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Deposit() {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div className="text-xl font-semibold">Deposit Funds</div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input className="w-full border rounded px-3 py-2" placeholder="$100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
          <select className="w-full border rounded px-3 py-2">
            <option>Credit Card</option>
            <option>Bank Transfer</option>
            <option>Crypto (USDT)</option>
          </select>
        </div>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Proceed</button>
    </div>
  );
}

export function Withdraw() {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div className="text-xl font-semibold">Withdraw Funds</div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input className="w-full border rounded px-3 py-2" placeholder="$100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
          <select className="w-full border rounded px-3 py-2">
            <option>Bank</option>
            <option>Crypto (USDT)</option>
            <option>PayPal</option>
          </select>
        </div>
      </div>
      <button className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded">Request Payout</button>
    </div>
  );
}

export function Transactions() {
  const rows = [
    { id: 'TX-1001', type: 'Deposit', amount: 500, status: 'Completed' },
    { id: 'TX-1002', type: 'Trade', amount: -50, status: 'Win' },
    { id: 'TX-1003', type: 'Withdrawal', amount: -200, status: 'Processing' },
  ];
  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="text-xl font-semibold mb-4">Transaction History</div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="p-2">ID</th>
              <th className="p-2">Type</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.id}</td>
                <td className="p-2">{r.type}</td>
                <td className={`p-2 ${r.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>{r.amount < 0 ? '-' : '+'}${Math.abs(r.amount)}</td>
                <td className="p-2">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Account({ user }) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div className="text-xl font-semibold">Account</div>
      {user ? (
        <div className="space-y-2 text-sm">
          <div><span className="text-gray-500">Name: </span><span className="font-medium">{user.name}</span></div>
          <div><span className="text-gray-500">Email: </span><span className="font-medium">{user.email}</span></div>
          <div><span className="text-gray-500">Tier: </span><span className="font-medium">Standard</span></div>
        </div>
      ) : (
        <div className="text-gray-600">Please login to view account details.</div>
      )}
    </div>
  );
}

export function Tournaments() {
  const items = [
    { name: 'Spring Cup', prize: '$10,000', ends: '12 days' },
    { name: 'Crypto Sprint', prize: '$5,000', ends: '3 days' },
    { name: 'Pro League', prize: '$25,000', ends: '30 days' },
  ];
  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="text-xl font-semibold mb-4">Tournaments</div>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((t) => (
          <div key={t.name} className="border rounded-lg p-4">
            <div className="font-semibold text-lg">{t.name}</div>
            <div className="text-sm text-gray-500 mb-2">Ends in {t.ends}</div>
            <div className="text-2xl font-bold mb-3">{t.prize}</div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Join</button>
          </div>
        ))}
      </div>
    </div>
  );
}
