import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const initialSuppliers = [];

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [form, setForm] = useState({ name: '', contact: '', email: '', address: '' });
  const [editId, setEditId] = useState(null);
  const [viewSupplier, setViewSupplier] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!form.name || !form.contact || !form.email || !form.address) return;
    let updated;
    if (editId) {
      updated = suppliers.map(s => s.id === editId ? { ...form, id: editId } : s);
    } else {
      updated = [...suppliers, { ...form, id: Date.now() }];
    }
    setSuppliers(updated);
    setForm({ name: '', contact: '', email: '', address: '' });
    setEditId(null);
  };

  const handleEdit = supplier => {
    setForm({ name: supplier.name, contact: supplier.contact, email: supplier.email, address: supplier.address });
    setEditId(supplier.id);
  };

  const handleDelete = id => setSuppliers(suppliers.filter(s => s.id !== id));

  return (
    <div className="max-w-3xl mx-auto bg-transparent rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Supplier Management</h2>
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input name="name" value={form.name} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Supplier Name" />
          <input name="contact" value={form.contact} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Contact" />
          <input name="email" value={form.email} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Email" />
          <input name="address" value={form.address} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Address" />
        </div>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
          {editId ? 'Update Supplier' : 'Add Supplier'}
        </button>
      </div>
      <table className="min-w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-3 border text-left">Name</th>
            <th className="py-2 px-3 border text-left">Contact</th>
            <th className="py-2 px-3 border text-left">Email</th>
            <th className="py-2 px-3 border text-left">Address</th>
            <th className="py-2 px-3 border text-center min-w-[120px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-6 text-gray-500 text-center">No suppliers added yet.</td>
            </tr>
          ) : (
            suppliers.map(supplier => (
              <tr key={supplier.id} className="hover:bg-gray-50">
                <td className="py-2 px-3 border text-left">{supplier.name}</td>
                <td className="py-2 px-3 border text-left">{supplier.contact}</td>
                <td className="py-2 px-3 border text-left">{supplier.email}</td>
                <td className="py-2 px-3 border text-left">{supplier.address}</td>
                <td className="py-2 px-3 border text-center min-w-[120px]">
                  <button onClick={() => setViewSupplier(supplier)} className="text-blue-500 hover:text-blue-700 mr-3" title="View">
                    <FaEye />
                  </button>
                  <button onClick={() => handleEdit(supplier)} className="text-yellow-500 hover:text-yellow-700 mr-3" title="Edit">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(supplier.id)} className="text-red-500 hover:text-red-700" title="Delete">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {viewSupplier && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 32, minWidth: 320, boxShadow: '0 2px 16px #0002', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ fontWeight: 600, fontSize: 18 }}>Supplier Details</h3>
            <div>
              <div><strong>Name:</strong> {viewSupplier.name}</div>
              <div><strong>Contact:</strong> {viewSupplier.contact}</div>
              <div><strong>Email:</strong> {viewSupplier.email}</div>
              <div><strong>Address:</strong> {viewSupplier.address}</div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setViewSupplier(null)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 