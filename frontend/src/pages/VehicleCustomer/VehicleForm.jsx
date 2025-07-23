import React, { useState, useEffect } from 'react';

export default function VehicleForm({ initialData, onSave, onCancel, editMode, customers = [] }) {
  const [form, setForm] = useState({
    make: '',
    model: '',
    vin: '',
    regNo: '',
    year: '',
    odometer: '',
    engineNo: '',
    chassisNo: '',
    customerId: ''
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">{editMode ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
      <form onSubmit={e => { e.preventDefault(); onSave(form); }}>
        <div className="grid grid-cols-1 gap-4">
          <input name="make" value={form.make} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Vehicle Make" required />
          <input name="model" value={form.model} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Vehicle Model" required />
          <input name="vin" value={form.vin} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="VIN" required />
          <input name="regNo" value={form.regNo} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Registration Number" required />
          <input name="year" value={form.year} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Year of Manufacture" required />
          <input name="odometer" value={form.odometer} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Odometer Reading" type="number" min="0" />
          <input name="engineNo" value={form.engineNo} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Engine Number" />
          <input name="chassisNo" value={form.chassisNo} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Chassis Number" />
          <select name="customerId" value={form.customerId} onChange={handle} className="border rounded-lg px-4 py-2">
            <option value="">Select Customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.contact})</option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 mt-6 justify-end">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-400 text-white font-semibold">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">{editMode ? 'Update' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
} 