import React, { useState } from 'react';

const initialJobs = [];

export default function JobOrders() {
  const [jobs, setJobs] = useState(initialJobs);
  const [form, setForm] = useState({
    customer: '',
    vehicle: '',
    serviceType: '',
    status: 'Pending',
    assignedBay: '',
    scheduledTime: '',
    technician: ''
  });
  const [editId, setEditId] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!form.customer || !form.vehicle || !form.serviceType || !form.assignedBay || !form.scheduledTime || !form.technician) return;
    let updated;
    if (editId) {
      updated = jobs.map(j => j.id === editId ? { ...form, id: editId } : j);
    } else {
      updated = [...jobs, { ...form, id: Date.now() }];
    }
    setJobs(updated);
    setForm({ customer: '', vehicle: '', serviceType: '', status: 'Pending', assignedBay: '', scheduledTime: '', technician: '' });
    setEditId(null);
  };

  const handleEdit = job => {
    setForm({
      customer: job.customer,
      vehicle: job.vehicle,
      serviceType: job.serviceType,
      status: job.status,
      assignedBay: job.assignedBay,
      scheduledTime: job.scheduledTime,
      technician: job.technician
    });
    setEditId(job.id);
  };

  const handleDelete = id => setJobs(jobs.filter(j => j.id !== id));

  return (
    <div className="max-w-5xl mx-auto bg-transparent rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Job Orders</h2>
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input name="customer" value={form.customer} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Customer" />
          <input name="vehicle" value={form.vehicle} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Vehicle" />
          <input name="serviceType" value={form.serviceType} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Service Type" />
          <input name="assignedBay" value={form.assignedBay} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Assigned Bay" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input name="scheduledTime" value={form.scheduledTime} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Scheduled Time" type="datetime-local" />
          <input name="technician" value={form.technician} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Technician" />
          <select name="status" value={form.status} onChange={handleChange} className="border rounded-lg px-4 py-2">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
          {editId ? 'Update Job' : 'Add Job'}
        </button>
      </div>
      <table className="min-w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-3 border text-left">Customer</th>
            <th className="py-2 px-3 border text-left">Vehicle</th>
            <th className="py-2 px-3 border text-left">Service Type</th>
            <th className="py-2 px-3 border text-left">Status</th>
            <th className="py-2 px-3 border text-left">Assigned Bay</th>
            <th className="py-2 px-3 border text-left">Scheduled Time</th>
            <th className="py-2 px-3 border text-left">Technician</th>
            <th className="py-2 px-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="8" className="py-6 text-gray-500 text-center">No job orders yet.</td>
            </tr>
          ) : (
            jobs.map(job => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="py-2 px-3 border text-left">{job.customer}</td>
                <td className="py-2 px-3 border text-left">{job.vehicle}</td>
                <td className="py-2 px-3 border text-left">{job.serviceType}</td>
                <td className="py-2 px-3 border text-left">{job.status}</td>
                <td className="py-2 px-3 border text-left">{job.assignedBay}</td>
                <td className="py-2 px-3 border text-left">{job.scheduledTime}</td>
                <td className="py-2 px-3 border text-left">{job.technician}</td>
                <td className="py-2 px-3 border text-center">
                  <button onClick={() => handleEdit(job)} className="bg-yellow-400 text-white px-3 py-1 rounded-full mr-2 hover:bg-yellow-500">Edit</button>
                  <button onClick={() => handleDelete(job.id)} className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 