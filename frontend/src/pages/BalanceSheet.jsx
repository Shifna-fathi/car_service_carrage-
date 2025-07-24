import React, { useState } from 'react';

export default function BalanceSheet() {
  const [accounts, setAccounts] = useState([]); // {name, type, balance, description}
  const [form, setForm] = useState({
    name: '',
    type: 'asset',
    balance: '',
    description: ''
  });

  // Business info for print
  const businessName = "My Car Service Center";
  const businessAddress = "123 Main Road, City, Country";
  const today = new Date().toISOString().slice(0, 10);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAddAccount = e => {
    e.preventDefault();
    if (!form.name || !form.type || !form.balance) return;
    setAccounts([
      ...accounts,
      {
        ...form,
        balance: parseFloat(form.balance)
      }
    ]);
    setForm({ name: '', type: 'asset', balance: '', description: '' });
  };

  // Filter accounts by type
  const assets = accounts.filter(a => a.type === 'asset');
  const liabilities = accounts.filter(a => a.type === 'liability');
  // Equity is not entered directly, but calculated

  // Calculate totals
  const totalAssets = assets.reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = liabilities.reduce((sum, a) => sum + a.balance, 0);
  const equity = totalAssets - totalLiabilities;

  return (
    <div className="max-w-4xl mx-auto bg-transparent rounded-xl shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-2 print:flex-col print:items-start print:mb-0">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 print:mb-2 print:text-black print:text-3xl print:font-extrabold">Balance Sheet</h2>
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
        <div className="text-base mb-1">Balance Sheet</div>
        <div className="text-sm mt-1">Printed on: {today}</div>
      </div>
      {/* On screen header for business info */}
      <div className="print:hidden mb-6">
        <div className="text-xl font-bold mb-1">{businessName}</div>
        <div className="text-base mb-1">{businessAddress}</div>
      </div>
      {/* Add Account Form */}
      <form onSubmit={handleAddAccount} className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4 print:hidden">
        <input name="name" value={form.name} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Account Name" />
        <select name="type" value={form.type} onChange={handleChange} className="border rounded-lg px-4 py-2">
          <option value="asset">Asset</option>
          <option value="liability">Liability</option>
        </select>
        <input name="balance" value={form.balance} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Balance" type="number" min="0" />
        <input name="description" value={form.description} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Description (optional)" />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">Add</button>
      </form>
      {/* Balance Sheet Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:gap-2">
        {/* Assets */}
        <div>
          <h3 className="text-lg font-bold mb-2 print:text-black">Assets</h3>
          <table className="min-w-full text-sm border border-gray-300 print:border-black print:text-base print:mt-2 mb-4">
            <thead className="bg-gray-100 print:bg-white">
              <tr>
                <th className="py-2 px-3 border text-left print:border-black">Account</th>
                <th className="py-2 px-3 border text-right print:border-black">Balance</th>
              </tr>
            </thead>
            <tbody>
              {assets.length === 0 ? (
                <tr>
                  <td colSpan="2" className="py-4 text-gray-500 text-center print:text-black">No assets.</td>
                </tr>
              ) : (
                assets.map((a, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 print:hover:bg-white">
                    <td className="py-2 px-3 border text-left print:border-black">{a.name}</td>
                    <td className="py-2 px-3 border text-right print:border-black">₹{a.balance.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td className="py-2 px-3 border text-right font-bold print:border-black">Total Assets</td>
                <td className="py-2 px-3 border text-right font-bold print:border-black">₹{totalAssets.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        {/* Liabilities */}
        <div>
          <h3 className="text-lg font-bold mb-2 print:text-black">Liabilities</h3>
          <table className="min-w-full text-sm border border-gray-300 print:border-black print:text-base print:mt-2 mb-4">
            <thead className="bg-gray-100 print:bg-white">
              <tr>
                <th className="py-2 px-3 border text-left print:border-black">Account</th>
                <th className="py-2 px-3 border text-right print:border-black">Balance</th>
              </tr>
            </thead>
            <tbody>
              {liabilities.length === 0 ? (
                <tr>
                  <td colSpan="2" className="py-4 text-gray-500 text-center print:text-black">No liabilities.</td>
                </tr>
              ) : (
                liabilities.map((a, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 print:hover:bg-white">
                    <td className="py-2 px-3 border text-left print:border-black">{a.name}</td>
                    <td className="py-2 px-3 border text-right print:border-black">₹{a.balance.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td className="py-2 px-3 border text-right font-bold print:border-black">Total Liabilities</td>
                <td className="py-2 px-3 border text-right font-bold print:border-black">₹{totalLiabilities.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        {/* Equity */}
        <div>
          <h3 className="text-lg font-bold mb-2 print:text-black">Equity</h3>
          <table className="min-w-full text-sm border border-gray-300 print:border-black print:text-base print:mt-2 mb-4">
            <thead className="bg-gray-100 print:bg-white">
              <tr>
                <th className="py-2 px-3 border text-left print:border-black">Description</th>
                <th className="py-2 px-3 border text-right print:border-black">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-3 border text-left print:border-black">Equity (Assets - Liabilities)</td>
                <td className="py-2 px-3 border text-right print:border-black">₹{equity.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
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