import React, { useState, useEffect } from 'react';

const initialUsers = [];
const roles = [
  'super_admin',
  'admin',
  'manager',
  'branch_manager',
  'cashier'
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '', branch: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('branches');
    if (stored) setBranches(JSON.parse(stored));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!form.name || !form.email || (!editId && !form.password) || !form.role || !form.branch) return;
    let updated;
    if (editId) {
      updated = users.map(u => u.id === editId ? { ...form, id: editId } : u);
    } else {
      updated = [...users, { ...form, id: Date.now() }];
    }
    setUsers(updated);
    setForm({ name: '', email: '', password: '', role: '', branch: '' });
    setEditId(null);
  };

  const handleEdit = user => {
    setForm({ name: user.name, email: user.email, password: '', role: user.role, branch: user.branch });
    setEditId(user.id);
  };

  const handleDelete = id => setUsers(users.filter(u => u.id !== id));

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">User Management</h2>
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <input name="name" value={form.name} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Name" />
          <input name="email" value={form.email} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Email" />
          <input name="password" value={form.password} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Password" type="password" />
          <select name="role" value={form.role} onChange={handleChange} className="border rounded-lg px-4 py-2">
            <option value="">-- Role --</option>
            {roles.map(r => <option key={r} value={r}>{r.replace('_', ' ').toUpperCase()}</option>)}
          </select>
          <select name="branch" value={form.branch} onChange={handleChange} className="border rounded-lg px-4 py-2">
            <option value="">-- Branch --</option>
            {branches.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
          </select>
        </div>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
          {editId ? 'Update User' : 'Add User'}
        </button>
      </div>
      <table className="min-w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-3 border text-left">Name</th>
            <th className="py-2 px-3 border text-left">Email</th>
            <th className="py-2 px-3 border text-left">Role</th>
            <th className="py-2 px-3 border text-left">Branch</th>
            <th className="py-2 px-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-6 text-gray-500 text-center">No users added yet.</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-3 border text-left">{user.name}</td>
                <td className="py-2 px-3 border text-left">{user.email}</td>
                <td className="py-2 px-3 border text-left">{user.role.replace('_', ' ').toUpperCase()}</td>
                <td className="py-2 px-3 border text-left">{user.branch}</td>
                <td className="py-2 px-3 border text-center">
                  <button onClick={() => handleEdit(user)} className="bg-yellow-400 text-white px-3 py-1 rounded-full mr-2 hover:bg-yellow-500">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 