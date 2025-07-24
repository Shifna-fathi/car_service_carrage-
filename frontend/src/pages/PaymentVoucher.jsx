import React, { useState } from 'react';

const accountHeads = ["Spare Parts", "Wages", "Utilities", "Rent", "Other"];
const paymentMethods = ["Cash", "Bank"];

export default function PaymentVoucher() {
  const [vouchers, setVouchers] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    payee: '',
    description: '',
    paymentMethod: '',
    accountHead: '',
    amount: '',
    reference: ''
  });
  const [editId, setEditId] = useState(null);

  // Auto-generate voucher number
  const getNextVoucherNo = () => {
    if (vouchers.length === 0) return 'VCH-0001';
    const last = vouchers[vouchers.length - 1].voucherNo;
    const num = parseInt(last.replace('VCH-', '')) + 1;
    return `VCH-${num.toString().padStart(4, '0')}`;
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!form.date || !form.payee || !form.paymentMethod || !form.accountHead || !form.amount) return;
    let updated;
    if (editId) {
      updated = vouchers.map(v => v.id === editId ? { ...form, id: editId, voucherNo: vouchers.find(v => v.id === editId).voucherNo } : v);
    } else {
      updated = [
        ...vouchers,
        {
          ...form,
          id: Date.now(),
          voucherNo: getNextVoucherNo(),
          type: 'debit'
        }
      ];
    }
    setVouchers(updated);
    setForm({ date: new Date().toISOString().slice(0, 10), payee: '', description: '', paymentMethod: '', accountHead: '', amount: '', reference: '' });
    setEditId(null);
  };

  const handleEdit = v => {
    setForm({
      date: v.date,
      payee: v.payee,
      description: v.description,
      paymentMethod: v.paymentMethod,
      accountHead: v.accountHead,
      amount: v.amount,
      reference: v.reference || ''
    });
    setEditId(v.id);
  };

  const handleDelete = id => setVouchers(vouchers.filter(v => v.id !== id));

  return (
    <div className="max-w-4xl mx-auto bg-transparent rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Payment Voucher</h2>
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input name="date" type="date" value={form.date} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Date" />
          <input name="payee" value={form.payee} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Payee Name" />
          <input name="amount" value={form.amount} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Amount" type="number" min="0" />
          <input name="reference" value={form.reference} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Reference/Invoice No (optional)" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="border rounded-lg px-4 py-2">
            <option value="">Payment Method</option>
            {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select name="accountHead" value={form.accountHead} onChange={handleChange} className="border rounded-lg px-4 py-2">
            <option value="">Account Head</option>
            {accountHeads.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <input name="description" value={form.description} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Description" />
        </div>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
          {editId ? 'Update Voucher' : 'Add Voucher'}
        </button>
      </div>
      <table className="min-w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-3 border text-left">Voucher No</th>
            <th className="py-2 px-3 border text-left">Date</th>
            <th className="py-2 px-3 border text-left">Payee</th>
            <th className="py-2 px-3 border text-left">Account Head</th>
            <th className="py-2 px-3 border text-left">Amount</th>
            <th className="py-2 px-3 border text-left">Payment Method</th>
            <th className="py-2 px-3 border text-left">Description</th>
            <th className="py-2 px-3 border text-left">Reference</th>
            <th className="py-2 px-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.length === 0 ? (
            <tr>
              <td colSpan="9" className="py-6 text-gray-500 text-center">No payment vouchers yet.</td>
            </tr>
          ) : (
            vouchers.map(v => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="py-2 px-3 border text-left">{v.voucherNo}</td>
                <td className="py-2 px-3 border text-left">{v.date}</td>
                <td className="py-2 px-3 border text-left">{v.payee}</td>
                <td className="py-2 px-3 border text-left">{v.accountHead}</td>
                <td className="py-2 px-3 border text-left">{v.amount}</td>
                <td className="py-2 px-3 border text-left">{v.paymentMethod}</td>
                <td className="py-2 px-3 border text-left">{v.description}</td>
                <td className="py-2 px-3 border text-left">{v.reference}</td>
                <td className="py-2 px-3 border text-center">
                  <button onClick={() => handleEdit(v)} className="bg-yellow-400 text-white px-3 py-1 rounded-full mr-2 hover:bg-yellow-500">Edit</button>
                  <button onClick={() => handleDelete(v.id)} className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 