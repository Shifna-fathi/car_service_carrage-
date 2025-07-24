import React, { useState } from 'react';

const accountHeads = [
  "Cash",
  "Service Income",
  "Spare Parts",
  "Wages",
  "Salary Expense",
  "Other Income",
  "Utilities",
  "Rent",
  "Other"
];

export default function Ledger() {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    description: '',
    debit: '',
    credit: ''
  });

  const handleAccountChange = e => setSelectedAccount(e.target.value);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!selectedAccount || !form.date || !form.description || (!form.debit && !form.credit)) return;
    setEntries([
      ...entries,
      {
        account: selectedAccount,
        date: form.date,
        description: form.description,
        debit: form.debit ? parseFloat(form.debit) : 0,
        credit: form.credit ? parseFloat(form.credit) : 0
      }
    ]);
    setForm({ date: new Date().toISOString().slice(0, 10), description: '', debit: '', credit: '' });
  };

  // Filter and sort entries for the selected account
  const filteredEntries = entries
    .filter(e => e.account === selectedAccount)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate running balance
  let running = 0;
  const entriesWithBalance = filteredEntries.map(e => {
    running += e.credit - e.debit;
    return { ...e, balance: running };
  });

  return (
    <div className="max-w-4xl mx-auto bg-transparent rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Ledger</h2>
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <select value={selectedAccount} onChange={handleAccountChange} className="border rounded-lg px-4 py-2">
          <option value="">Select Account Head</option>
          {accountHeads.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      {selectedAccount && (
        <>
          <form onSubmit={handleAddEntry} className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
            <input name="date" type="date" value={form.date} onChange={handleChange} className="border rounded-lg px-4 py-2" />
            <input name="description" value={form.description} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Description" />
            <input name="debit" value={form.debit} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Debit" type="number" min="0" />
            <input name="credit" value={form.credit} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Credit" type="number" min="0" />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">Add Entry</button>
          </form>
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 border text-left">Date</th>
                <th className="py-2 px-3 border text-left">Description</th>
                <th className="py-2 px-3 border text-right">Debit</th>
                <th className="py-2 px-3 border text-right">Credit</th>
                <th className="py-2 px-3 border text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {entriesWithBalance.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-6 text-gray-500 text-center">No entries for this account.</td>
                </tr>
              ) : (
                entriesWithBalance.map((e, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-2 px-3 border text-left">{e.date}</td>
                    <td className="py-2 px-3 border text-left">{e.description}</td>
                    <td className="py-2 px-3 border text-right">{e.debit ? e.debit.toFixed(2) : ''}</td>
                    <td className="py-2 px-3 border text-right">{e.credit ? e.credit.toFixed(2) : ''}</td>
                    <td className="py-2 px-3 border text-right">{e.balance.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
} 