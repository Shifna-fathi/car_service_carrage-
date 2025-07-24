import React, { useState } from 'react';

const incomeHeads = [
  'Service Income',
  'Spare Parts Sales',
  'Other Income'
];
const expenseHeads = [
  'Wages',
  'Salary Expense',
  'Utilities',
  'Rent',
  'Other Expense'
];

export default function ProfitLossStatement() {
  const [transactions, setTransactions] = useState([]); // {date, head, type, amount, description}
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    head: '',
    type: 'income',
    amount: '',
    description: ''
  });
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleTypeChange = e => {
    setForm({ ...form, type: e.target.value, head: '' });
  };

  const handleAddTransaction = e => {
    e.preventDefault();
    if (!form.date || !form.head || !form.amount) return;
    setTransactions([
      ...transactions,
      {
        ...form,
        amount: parseFloat(form.amount)
      }
    ]);
    setForm({ date: new Date().toISOString().slice(0, 10), head: '', type: 'income', amount: '', description: '' });
  };

  // Filter transactions by date range
  const filteredTx = transactions.filter(tx => {
    if (!dateRange.from && !dateRange.to) return true;
    const txDate = new Date(tx.date);
    const from = dateRange.from ? new Date(dateRange.from) : null;
    const to = dateRange.to ? new Date(dateRange.to) : null;
    if (from && txDate < from) return false;
    if (to && txDate > to) return false;
    return true;
  });

  // Calculate totals
  const totalIncome = filteredTx.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = filteredTx.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
  const netProfit = totalIncome - totalExpense;

  // Get today's date for print
  const today = new Date().toISOString().slice(0, 10);
  // Example business info (customize as needed)
  const businessName = "My Car Service Center";
  const businessAddress = "123 Main Road, City, Country";

  return (
    <div className="max-w-4xl mx-auto bg-transparent rounded-xl shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-2 print:flex-col print:items-start print:mb-0">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 print:mb-2 print:text-black print:text-3xl print:font-extrabold">Profit & Loss Statement</h2>
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
        <div className="text-base mb-1">Profit & Loss Statement</div>
        <div className="text-base">Date Range: {dateRange.from || '____'} to {dateRange.to || '____'}</div>
        <div className="text-sm mt-1">Printed on: {today}</div>
      </div>
      {/* On screen header for business info */}
      <div className="print:hidden mb-6">
        <div className="text-xl font-bold mb-1">{businessName}</div>
        <div className="text-base mb-1">{businessAddress}</div>
        <div className="text-base">Date Range: {dateRange.from || '____'} to {dateRange.to || '____'}</div>
      </div>
      {/* Date Range Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center print:hidden">
        <label className="flex items-center gap-2">From:
          <input type="date" value={dateRange.from} onChange={e => setDateRange({ ...dateRange, from: e.target.value })} className="border rounded-lg px-2 py-1" />
        </label>
        <label className="flex items-center gap-2">To:
          <input type="date" value={dateRange.to} onChange={e => setDateRange({ ...dateRange, to: e.target.value })} className="border rounded-lg px-2 py-1" />
        </label>
      </div>
      {/* Add Transaction Form */}
      <form onSubmit={handleAddTransaction} className="mb-6 grid grid-cols-1 md:grid-cols-6 gap-4">
        <input name="date" type="date" value={form.date} onChange={handleChange} className="border rounded-lg px-4 py-2" />
        <select name="type" value={form.type} onChange={handleTypeChange} className="border rounded-lg px-4 py-2">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select name="head" value={form.head} onChange={handleChange} className="border rounded-lg px-4 py-2">
          <option value="">Select Head</option>
          {(form.type === 'income' ? incomeHeads : expenseHeads).map(h => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
        <input name="amount" value={form.amount} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Amount" type="number" min="0" />
        <input name="description" value={form.description} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Description" />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">Add</button>
      </form>
      {/* Summary */}
      <div className="mb-6 flex flex-col md:flex-row gap-6 items-center justify-between bg-gray-100 rounded-lg p-4 print:bg-white print:border print:border-gray-400 print:rounded-none print:p-2 print:mb-2">
        <div className="text-lg font-semibold text-green-700 print:text-black">Total Income: <span className="font-bold">₹{totalIncome.toFixed(2)}</span></div>
        <div className="text-lg font-semibold text-red-700 print:text-black">Total Expenses: <span className="font-bold">₹{totalExpense.toFixed(2)}</span></div>
        <div className={`text-lg font-semibold ${netProfit >= 0 ? 'text-blue-700' : 'text-orange-700'} print:text-black`}>Net Profit: <span className="font-bold">₹{netProfit.toFixed(2)}</span></div>
      </div>
      {/* Transactions Table */}
      <table className="min-w-full text-sm border border-gray-300 print:border-black print:text-base print:mt-2">
        <thead className="bg-gray-100 print:bg-white">
          <tr>
            <th className="py-2 px-3 border text-left print:border-black">Date</th>
            <th className="py-2 px-3 border text-left print:border-black">Type</th>
            <th className="py-2 px-3 border text-left print:border-black">Head</th>
            <th className="py-2 px-3 border text-right print:border-black">Amount</th>
            <th className="py-2 px-3 border text-left print:border-black">Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredTx.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-6 text-gray-500 text-center print:text-black">No transactions in this range.</td>
            </tr>
          ) : (
            filteredTx.map((tx, idx) => (
              <tr key={idx} className="hover:bg-gray-50 print:hover:bg-white">
                <td className="py-2 px-3 border text-left print:border-black">{tx.date}</td>
                <td className="py-2 px-3 border text-left print:border-black">{tx.type === 'income' ? 'Income' : 'Expense'}</td>
                <td className="py-2 px-3 border text-left print:border-black">{tx.head}</td>
                <td className="py-2 px-3 border text-right print:border-black">{tx.amount.toFixed(2)}</td>
                <td className="py-2 px-3 border text-left print:border-black">{tx.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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