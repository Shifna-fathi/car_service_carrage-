import React, { useState } from 'react';

export default function CustomerLoyaltyPoints() {
  const [history, setHistory] = useState([]);
  const [earnForm, setEarnForm] = useState({ points: '', desc: '' });

  const points = history.reduce((sum, h) => sum + h.points, 0);

  const handleEarn = (e) => {
    e.preventDefault();
    if (!earnForm.points || !earnForm.desc) return;
    const date = new Date().toISOString().slice(0, 10);
    setHistory([
      ...history,
      { date, desc: earnForm.desc, action: 'Earned', points: parseInt(earnForm.points, 10) }
    ]);
    setEarnForm({ points: '', desc: '' });
  };

  const redeem = () => {
    if (points < 500) return;
    const date = new Date().toISOString().slice(0, 10);
    setHistory([
      ...history,
      { date, desc: 'Redeemed for Discount', action: 'Redeemed', points: -500 }
    ]);
  };

  // Compute running balance for each row
  let running = 0;
  const historyWithBalance = history.map(h => {
    running += h.points;
    return { ...h, balance: running };
  });

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Loyalty Points</h2>
      {/* Earn Points Form */}
      <form onSubmit={handleEarn} className="flex gap-2 mb-4">
        <input
          type="number"
          min="1"
          value={earnForm.points}
          onChange={e => setEarnForm({ ...earnForm, points: e.target.value })}
          placeholder="Points"
          className="border rounded px-2 py-1"
        />
        <input
          type="text"
          value={earnForm.desc}
          onChange={e => setEarnForm({ ...earnForm, desc: e.target.value })}
          placeholder="Description"
          className="border rounded px-2 py-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Add Points</button>
      </form>
      <div className="mb-4 text-xl font-semibold">Current Points: <span className="text-green-600">{points}</span></div>
      <button onClick={redeem} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-6" disabled={points < 500}>Redeem 500 Points</button>
      <h3 className="text-lg font-semibold text-blue-600 mb-2">Earning History</h3>
      <table className="min-w-full text-sm text-center border border-gray-300">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-3 border">Date</th>
            <th className="py-2 px-3 border">Description</th>
            <th className="py-2 px-3 border">Action</th>
            <th className="py-2 px-3 border">Points</th>
            <th className="py-2 px-3 border">Balance</th>
          </tr>
        </thead>
        <tbody>
          {historyWithBalance.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-6 text-gray-500 text-center">No earning history yet.</td>
            </tr>
          ) : (
            historyWithBalance.map((h, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="py-2 px-3 border">{h.date}</td>
                <td className="py-2 px-3 border">{h.desc}</td>
                <td className="py-2 px-3 border">{h.action}</td>
                <td className="py-2 px-3 border">{h.points > 0 ? `+${h.points}` : h.points}</td>
                <td className="py-2 px-3 border">{h.balance}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 