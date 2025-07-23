import React, { useState, useEffect } from 'react';

export default function CustomerForm({ initialData, onSave, onCancel, editMode }) {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    preferredCommunication: '',
    preferredPackage: '',
    oilBrand: '',
    tireType: '',
    loyaltyPoints: 0
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">{editMode ? 'Edit Customer' : 'Add Customer'}</h2>
      <form onSubmit={e => { e.preventDefault(); onSave(form); }}>
        <div className="grid grid-cols-1 gap-4">
          <input name="name" value={form.name} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Name" required />
          <input name="contact" value={form.contact} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Contact Number" required />
          <input name="email" value={form.email} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Email Address" />
          <input name="address" value={form.address} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Address" />
          <select name="preferredCommunication" value={form.preferredCommunication} onChange={handle} className="border rounded-lg px-4 py-2">
            <option value="">Preferred Communication</option>
            <option value="SMS">SMS</option>
            <option value="Email">Email</option>
            <option value="Call">Call</option>
          </select>
          <input name="preferredPackage" value={form.preferredPackage} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Preferred Service Package" />
          <input name="oilBrand" value={form.oilBrand} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Preferred Oil Brand" />
          <input name="tireType" value={form.tireType} onChange={handle} className="border rounded-lg px-4 py-2" placeholder="Preferred Tire Type" />
          <input name="loyaltyPoints" value={form.loyaltyPoints} readOnly className="border rounded-lg px-4 py-2 bg-gray-100" placeholder="Loyalty Points" />
        </div>
        <div className="flex gap-4 mt-6 justify-end">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-400 text-white font-semibold">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">{editMode ? 'Update' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
} 