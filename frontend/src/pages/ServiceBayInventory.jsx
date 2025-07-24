import React, { useState } from 'react';
import axios from 'axios';

const initialBayInventory = [];

export default function ServiceBayInventory() {
  const [bayInventory, setBayInventory] = useState(initialBayInventory);
  const [form, setForm] = useState({ item: '', quantity: '', bay: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!form.item || !form.quantity || !form.bay) return;
    let updated;
    if (editId) {
      updated = bayInventory.map(i => i.id === editId ? { ...form, id: editId } : i);
    } else {
      updated = [...bayInventory, { ...form, id: Date.now() }];
    }
    setBayInventory(updated);
    setForm({ item: '', quantity: '', bay: '' });
    setEditId(null);
  };

  const handleEdit = entry => {
    setForm({ item: entry.item, quantity: entry.quantity, bay: entry.bay });
    setEditId(entry.id);
  };

  const handleDelete = id => setBayInventory(bayInventory.filter(i => i.id !== id));

  return (
    <div className="max-w-3xl mx-auto bg-transparent rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Service Bay Inventory</h2>
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input name="item" value={form.item} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Item Name" />
          <input name="quantity" value={form.quantity} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Quantity" type="number" min="1" />
          <input name="bay" value={form.bay} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Service Bay" />
        </div>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
          {editId ? 'Update Entry' : 'Add Entry'}
        </button>
      </div>
      <table className="min-w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-3 border text-left">Item Name</th>
            <th className="py-2 px-3 border text-left">Quantity</th>
            <th className="py-2 px-3 border text-left">Service Bay</th>
            <th className="py-2 px-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bayInventory.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-6 text-gray-500 text-center">No inventory entries yet.</td>
            </tr>
          ) : (
            bayInventory.map(entry => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="py-2 px-3 border text-left">{entry.item}</td>
                <td className="py-2 px-3 border text-left">{entry.quantity}</td>
                <td className="py-2 px-3 border text-left">{entry.bay}</td>
                <td className="py-2 px-3 border text-center">
                  <button onClick={() => handleEdit(entry)} className="bg-yellow-400 text-white px-3 py-1 rounded-full mr-2 hover:bg-yellow-500">Edit</button>
                  <button onClick={() => handleDelete(entry.id)} className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 