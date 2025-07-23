import React, { useState } from 'react';

const initialInventory = [];

export default function WarehouseInventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [form, setForm] = useState({ item: '', quantity: '', warehouse: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!form.item || !form.quantity || !form.warehouse) return;
    let updated;
    if (editId) {
      updated = inventory.map(i => i.id === editId ? { ...form, id: editId } : i);
    } else {
      updated = [...inventory, { ...form, id: Date.now() }];
    }
    setInventory(updated);
    setForm({ item: '', quantity: '', warehouse: '' });
    setEditId(null);
  };

  const handleEdit = entry => {
    setForm({ item: entry.item, quantity: entry.quantity, warehouse: entry.warehouse });
    setEditId(entry.id);
  };

  const handleDelete = id => setInventory(inventory.filter(i => i.id !== id));

  return (
    <div className="max-w-3xl mx-auto bg-transparent rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Warehouse Inventory</h2>
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input name="item" value={form.item} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Item Name" />
          <input name="quantity" value={form.quantity} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Quantity" type="number" min="1" />
          <input name="warehouse" value={form.warehouse} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Warehouse" />
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
            <th className="py-2 px-3 border text-left">Warehouse</th>
            <th className="py-2 px-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-6 text-gray-500 text-center">No inventory entries yet.</td>
            </tr>
          ) : (
            inventory.map(entry => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="py-2 px-3 border text-left">{entry.item}</td>
                <td className="py-2 px-3 border text-left">{entry.quantity}</td>
                <td className="py-2 px-3 border text-left">{entry.warehouse}</td>
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