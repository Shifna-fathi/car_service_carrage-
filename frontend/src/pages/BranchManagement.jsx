import React, { useState } from 'react';

const initialBranches = [];

export default function BranchManagement() {
  const [branches, setBranches] = useState(initialBranches);
  const [form, setForm] = useState({ name: '', address: '', contact: '', manager: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!form.name || !form.address || !form.contact || !form.manager) return;
    let updated;
    if (editId) {
      updated = branches.map(b => b.id === editId ? { ...form, id: editId } : b);
    } else {
      updated = [...branches, { ...form, id: Date.now() }];
    }
    setBranches(updated);
    localStorage.setItem('branches', JSON.stringify(updated));
    setForm({ name: '', address: '', contact: '', manager: '' });
    setEditId(null);
  };

  const handleEdit = branch => {
    setForm({ name: branch.name, address: branch.address, contact: branch.contact, manager: branch.manager });
    setEditId(branch.id);
  };

  const handleDelete = id => {
    const updated = branches.filter(b => b.id !== id);
    setBranches(updated);
    localStorage.setItem('branches', JSON.stringify(updated));
  };

  return (
    <div className="max-w-3xl mx-auto bg-transparent rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Branch Management</h2>
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input name="name" value={form.name} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Branch Name" />
          <input name="address" value={form.address} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Address" />
          <input name="contact" value={form.contact} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Contact" />
          <input name="manager" value={form.manager} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Manager" />
        </div>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
          {editId ? 'Update Branch' : 'Add Branch'}
        </button>
      </div>
      <table className="min-w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-3 border text-left">Name</th>
            <th className="py-2 px-3 border text-left">Address</th>
            <th className="py-2 px-3 border text-left">Contact</th>
            <th className="py-2 px-3 border text-left">Manager</th>
            <th className="py-2 px-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-6 text-gray-500 text-center">No branches added yet.</td>
            </tr>
          ) : (
            branches.map(branch => (
              <tr key={branch.id} className="hover:bg-gray-50">
                <td className="py-2 px-3 border text-left">{branch.name}</td>
                <td className="py-2 px-3 border text-left">{branch.address}</td>
                <td className="py-2 px-3 border text-left">{branch.contact}</td>
                <td className="py-2 px-3 border text-left">{branch.manager}</td>
                <td className="py-2 px-3 border text-center">
                  <button onClick={() => handleEdit(branch)} className="bg-yellow-400 text-white px-3 py-1 rounded-full mr-2 hover:bg-yellow-500">Edit</button>
                  <button onClick={() => handleDelete(branch.id)} className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 