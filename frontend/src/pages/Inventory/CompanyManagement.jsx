import React, { useState } from 'react';

export default function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ name: '', address: '', contact: '', email: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAdd = e => {
    e.preventDefault();
    if (!form.name) return;
    setCompanies([...companies, { ...form, id: Date.now() }]);
    setForm({ name: '', address: '', contact: '', email: '' });
  };
  const handleDelete = id => setCompanies(companies.filter(c => c.id !== id));

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Company Management</h2>
      <form onSubmit={handleAdd} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input name="name" value={form.name} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Company Name" required />
        <input name="address" value={form.address} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Address" />
        <input name="contact" value={form.contact} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Contact" />
        <input name="email" value={form.email} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Email" />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold md:col-span-4">Add Company</button>
      </form>
      <table className="min-w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-3 border">Name</th>
            <th className="py-2 px-3 border">Address</th>
            <th className="py-2 px-3 border">Contact</th>
            <th className="py-2 px-3 border">Email</th>
            <th className="py-2 px-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.length === 0 ? (
            <tr><td colSpan="5" className="py-6 text-gray-500 text-center">No companies added.</td></tr>
          ) : (
            companies.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="py-2 px-3 border">{c.name}</td>
                <td className="py-2 px-3 border">{c.address}</td>
                <td className="py-2 px-3 border">{c.contact}</td>
                <td className="py-2 px-3 border">{c.email}</td>
                <td className="py-2 px-3 border">
                  <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 