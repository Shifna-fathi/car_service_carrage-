import React, { useState } from 'react';

const mockUsers = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', branch: 'Main', status: 'Active' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'Manager', branch: 'Branch A', status: 'Inactive' },
  { id: 3, name: 'Carol Lee', email: 'carol@example.com', role: 'Technician', branch: 'Branch B', status: 'Active' },
];

const roles = ['Admin', 'Manager', 'Technician', 'Accountant', 'Receptionist'];
const branches = ['Main', 'Branch A', 'Branch B'];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: roles[0],
    branch: branches[0],
    status: 'Active',
  });

  const openAddModal = () => {
    setEditingUser(null);
    setForm({ name: '', email: '', password: '', role: roles[0], branch: branches[0], status: 'Active' });
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setForm({ ...user, password: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? { ...editingUser, ...form } : u)));
    } else {
      setUsers((prev) => [
        ...prev,
        { ...form, id: prev.length + 1 },
      ]);
    }
    setShowModal(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>User Management</h2>
      <button onClick={openAddModal} style={{ marginBottom: 16 }}>Add User</button>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Branch</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.branch}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => openEditModal(user)}>Edit</button>
                {/* Future: Delete/Deactivate button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320 }}>
            <h3>{editingUser ? 'Edit User' : 'Add User'}</h3>
            <div style={{ marginBottom: 12 }}>
              <label>Name:<br />
                <input name="name" value={form.name} onChange={handleChange} required />
              </label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Email:<br />
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Password:<br />
                <input name="password" type="password" value={form.password} onChange={handleChange} required={!editingUser} />
              </label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Role:<br />
                <select name="role" value={form.role} onChange={handleChange}>
                  {roles.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
              </label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Branch:<br />
                <select name="branch" value={form.branch} onChange={handleChange}>
                  {branches.map((branch) => <option key={branch} value={branch}>{branch}</option>)}
                </select>
              </label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Status:<br />
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit">Save</button>
              <button type="button" onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement; 