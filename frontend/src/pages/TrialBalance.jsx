import React, { useState } from 'react';

export default function TrialBalance() {
  const [accounts, setAccounts] = useState([]); // {name, type, amount}
  const [form, setForm] = useState({
    name: '',
    type: 'debit',
    amount: ''
  });

  // Business info for print
  const businessName = "My Car Service Center";
  const businessAddress = "123 Main Road, City, Country";
  const today = new Date().toISOString().slice(0, 10);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAddAccount = e => {
    e.preventDefault();
    if (!form.name || !form.type || !form.amount) return;
    setAccounts([
      ...accounts,
      {
        ...form,
        amount: parseFloat(form.amount)
      }
    ]);
    setForm({ name: '', type: 'debit', amount: '' });
  };

  // Group and sum
  const totalDebit = accounts.filter(a => a.type === 'debit').reduce((sum, a) => sum + a.amount, 0);
  const totalCredit = accounts.filter(a => a.type === 'credit').reduce((sum, a) => sum + a.amount, 0);
  const isBalanced = totalDebit === totalCredit;

  return (
    <div className="max-w-4xl mx-auto bg-transparent rounded-xl shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-2 print:flex-col print:items-start print:mb-0">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 print:mb-2 print:text-black print:text-3xl print:font-extrabold">Trial Balance</h2>
        <button
          onClick={() => window.print()}
          className="print:hidden bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
          style={{marginTop: '0.5rem'}}
        >
          Print
        </button>
      </div>
      {/* Statement Header for print */}
      <div className="print:block hidden mb-6" style={{ borderBottom: '2px solid #222', paddingBottom: 12, marginBottom: 24 }}>
        <div className="text-2xl font-bold mb-1">{businessName}</div>
        <div className="text-base mb-1">{businessAddress}</div>
        <div className="text-base mb-1">Trial Balance</div>
        <div className="text-sm mt-1">Printed on: {today}</div>
      </div>
      {/* On screen header for business info */}
      <div className="print:hidden mb-6">
        <div className="text-xl font-bold mb-1">{businessName}</div>
        <div className="text-base mb-1">{businessAddress}</div>
      </div>
      {/* Add Account Form */}
      <form onSubmit={handleAddAccount} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 print:hidden">
        <input name="name" value={form.name} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Account Name" />
        <select name="type" value={form.type} onChange={handleChange} className="border rounded-lg px-4 py-2">
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
        <input name="amount" value={form.amount} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Amount" type="number" min="0" />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">Add</button>
      </form>
      <table className="min-w-full text-sm border border-gray-300 print:border-black print:text-base print:mt-2 mb-4">
        <thead className="bg-gray-100 print:bg-white">
          <tr>
            <th className="py-2 px-3 border text-left print:border-black">Account</th>
            <th className="py-2 px-3 border text-right print:border-black">Debit</th>
            <th className="py-2 px-3 border text-right print:border-black">Credit</th>
          </tr>
        </thead>
        <tbody>
          {accounts.length === 0 ? (
            <tr>
              <td colSpan="3" className="py-4 text-gray-500 text-center print:text-black">No accounts found.</td>
            </tr>
          ) : (
            accounts.map((a, idx) => (
              <tr key={idx} className="hover:bg-gray-50 print:hover:bg-white">
                <td className="py-2 px-3 border text-left print:border-black">{a.name}</td>
                <td className="py-2 px-3 border text-right print:border-black">{a.type === 'debit' ? `₹${a.amount.toFixed(2)}` : ''}</td>
                <td className="py-2 px-3 border text-right print:border-black">{a.type === 'credit' ? `₹${a.amount.toFixed(2)}` : ''}</td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td className="py-2 px-3 border text-right font-bold print:border-black">Totals</td>
            <td className="py-2 px-3 border text-right font-bold print:border-black">₹{totalDebit.toFixed(2)}</td>
            <td className="py-2 px-3 border text-right font-bold print:border-black">₹{totalCredit.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <div className={`text-lg font-semibold ${isBalanced ? 'text-green-700' : 'text-red-700'} print:text-black mb-4`}>
        {isBalanced ? 'Trial Balance is balanced.' : `Not balanced! Difference: ₹${Math.abs(totalDebit - totalCredit).toFixed(2)}`}
      </div>
      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          .shadow-md, .rounded-xl, .bg-transparent, .bg-gray-100 { box-shadow: none !important; background: #fff !important; }
          .max-w-4xl, .mx-auto, .p-6, .mt-6 { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
          th, td { color: #000 !important; }
          h2, .text-2xl, .font-bold { color: #000 !important; }
        }
      `}</style>
    </div>
  );
} 