import React, { useState } from 'react';

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name: '', contact: '', address: '', email: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAdd = e => {
    e.preventDefault();
    if (!form.name) return;
    setSuppliers([...suppliers, { ...form, id: Date.now() }]);
    setForm({ name: '', contact: '', address: '', email: '' });
  };
  const handleDelete = id => setSuppliers(suppliers.filter(s => s.id !== id));

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Supplier Management</h2>
      <form onSubmit={handleAdd} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input name="name" value={form.name} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Supplier Name" required />
        <input name="contact" value={form.contact} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Contact" />
        <input name="address" value={form.address} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Address" />
        <input name="email" value={form.email} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Email" />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold md:col-span-4">Add Supplier</button>
      </form>
      <table className="min-w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-3 border">Name</th>
            <th className="py-2 px-3 border">Contact</th>
            <th className="py-2 px-3 border">Address</th>
            <th className="py-2 px-3 border">Email</th>
            <th className="py-2 px-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length === 0 ? (
            <tr><td colSpan="5" className="py-6 text-gray-500 text-center">No suppliers added.</td></tr>
          ) : (
            suppliers.map(s => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="py-2 px-3 border">{s.name}</td>
                <td className="py-2 px-3 border">{s.contact}</td>
                <td className="py-2 px-3 border">{s.address}</td>
                <td className="py-2 px-3 border">{s.email}</td>
                <td className="py-2 px-3 border">
                  <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 