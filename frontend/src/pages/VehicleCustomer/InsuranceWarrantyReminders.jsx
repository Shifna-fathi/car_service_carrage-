import React, { useState } from 'react';

export default function InsuranceWarrantyReminders() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [vehicleData, setVehicleData] = useState({}); // { [vehicleId]: { insurance, warranty, reminders } }
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
    regNo: '',
    insurance: { company: '', policyNumber: '', expiryDate: '' },
    warranty: { type: '', startDate: '', expiryDate: '', covered: '' }
  });

  // Get or initialize data for selected vehicle
  const selectedData = vehicleData[selectedVehicleId] || {
    insurance: { company: '', policyNumber: '', expiryDate: '' },
    warranty: { type: '', startDate: '', expiryDate: '', covered: '' },
    reminders: []
  };

  const setSelectedData = (newData) => {
    setVehicleData(prev => ({ ...prev, [selectedVehicleId]: { ...selectedData, ...newData } }));
  };

  const handleInsurance = e => setSelectedData({ insurance: { ...selectedData.insurance, [e.target.name]: e.target.value } });
  const handleWarranty = e => setSelectedData({ warranty: { ...selectedData.warranty, [e.target.name]: e.target.value } });
  const [reminderForm, setReminderForm] = useState({ type: '', date: '', notes: '' });
  const handleReminder = e => setReminderForm({ ...reminderForm, [e.target.name]: e.target.value });
  const addReminder = e => {
    e.preventDefault();
    if (!reminderForm.type || !reminderForm.date) return;
    setSelectedData({ reminders: [...selectedData.reminders, reminderForm] });
    setReminderForm({ type: '', date: '', notes: '' });
  };

  // Add new vehicle logic
  const saveNewVehicle = () => {
    if (!newVehicle.make || !newVehicle.model || !newVehicle.regNo) return;
    const id = Date.now();
    setVehicles([...vehicles, { ...newVehicle, id }]);
    setSelectedVehicleId(id.toString());
    setNewVehicle({
      make: '',
      model: '',
      regNo: '',
      insurance: { company: '', policyNumber: '', expiryDate: '' },
      warranty: { type: '', startDate: '', expiryDate: '', covered: '' }
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Insurance, Warranty & Reminders</h2>
      {/* Vehicle Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-blue-600">Select Vehicle</label>
        <div className="flex gap-2 items-center">
          <select
            className="border rounded-lg px-4 py-2 w-full"
            value={selectedVehicleId}
            onChange={e => setSelectedVehicleId(e.target.value)}
          >
            <option value="">-- Select a vehicle --</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>
                {v.make} {v.model} ({v.regNo})
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Add New Vehicle Form */}
      <label className="block mb-2 font-semibold text-blue-600">Add New Vehicle</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          value={newVehicle.make}
          onChange={e => setNewVehicle({ ...newVehicle, make: e.target.value })}
          className="border rounded-lg px-4 py-2"
          placeholder="Make"
        />
        <input
          value={newVehicle.model}
          onChange={e => setNewVehicle({ ...newVehicle, model: e.target.value })}
          className="border rounded-lg px-4 py-2"
          placeholder="Model"
        />
        <input
          value={newVehicle.regNo}
          onChange={e => setNewVehicle({ ...newVehicle, regNo: e.target.value })}
          className="border rounded-lg px-4 py-2"
          placeholder="Registration Number"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          value={newVehicle.insurance.company}
          onChange={e => setNewVehicle({ ...newVehicle, insurance: { ...newVehicle.insurance, company: e.target.value } })}
          className="border rounded-lg px-4 py-2"
          placeholder="Insurance Company Name"
        />
        <input
          value={newVehicle.insurance.policyNumber}
          onChange={e => setNewVehicle({ ...newVehicle, insurance: { ...newVehicle.insurance, policyNumber: e.target.value } })}
          className="border rounded-lg px-4 py-2"
          placeholder="Policy Number"
        />
        <input
          value={newVehicle.insurance.expiryDate}
          onChange={e => setNewVehicle({ ...newVehicle, insurance: { ...newVehicle.insurance, expiryDate: e.target.value } })}
          className="border rounded-lg px-4 py-2"
          placeholder="Insurance Expiry Date"
          type="date"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          value={newVehicle.warranty.type}
          onChange={e => setNewVehicle({ ...newVehicle, warranty: { ...newVehicle.warranty, type: e.target.value } })}
          className="border rounded-lg px-4 py-2"
          placeholder="Warranty Type (e.g., Parts, Service)"
        />
        <input
          value={newVehicle.warranty.startDate}
          onChange={e => setNewVehicle({ ...newVehicle, warranty: { ...newVehicle.warranty, startDate: e.target.value } })}
          className="border rounded-lg px-4 py-2"
          placeholder="Warranty Start Date"
          type="date"
        />
        <input
          value={newVehicle.warranty.expiryDate}
          onChange={e => setNewVehicle({ ...newVehicle, warranty: { ...newVehicle.warranty, expiryDate: e.target.value } })}
          className="border rounded-lg px-4 py-2"
          placeholder="Warranty Expiry Date"
          type="date"
        />
        <input
          value={newVehicle.warranty.covered}
          onChange={e => setNewVehicle({ ...newVehicle, warranty: { ...newVehicle.warranty, covered: e.target.value } })}
          className="border rounded-lg px-4 py-2"
          placeholder="Covered Parts/Services"
        />
      </div>
      <button type="button" onClick={saveNewVehicle} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold mb-8">Save Vehicle</button>
      {/* Vehicle List Table */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-blue-600 mb-2">All Vehicles</h3>
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="py-2 px-3 border text-left min-w-[120px]">Make</th>
              <th className="py-2 px-3 border text-left min-w-[120px]">Model</th>
              <th className="py-2 px-3 border text-left min-w-[140px]">Registration No.</th>
              <th className="py-2 px-3 border text-left min-w-[160px]">Insurance Company</th>
              <th className="py-2 px-3 border text-left min-w-[120px]">Policy No.</th>
              <th className="py-2 px-3 border text-left min-w-[140px]">Insurance Expiry</th>
              <th className="py-2 px-3 border text-left min-w-[120px]">Warranty Type</th>
              <th className="py-2 px-3 border text-left min-w-[140px]">Warranty Start</th>
              <th className="py-2 px-3 border text-left min-w-[140px]">Warranty Expiry</th>
              <th className="py-2 px-3 border text-left min-w-[160px]">Covered</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan="11" className="py-6 text-gray-500 text-center">No vehicles added yet.</td>
              </tr>
            ) : (
              vehicles.map(v => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border text-left">{v.make}</td>
                  <td className="py-2 px-3 border text-left">{v.model}</td>
                  <td className="py-2 px-3 border text-left">{v.regNo}</td>
                  <td className="py-2 px-3 border text-left">{v.insurance?.company}</td>
                  <td className="py-2 px-3 border text-left">{v.insurance?.policyNumber}</td>
                  <td className="py-2 px-3 border text-left">{v.insurance?.expiryDate}</td>
                  <td className="py-2 px-3 border text-left">{v.warranty?.type}</td>
                  <td className="py-2 px-3 border text-left">{v.warranty?.startDate}</td>
                  <td className="py-2 px-3 border text-left">{v.warranty?.expiryDate}</td>
                  <td className="py-2 px-3 border text-left">{v.warranty?.covered}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedVehicleId ? (
        <>
          {/* Insurance Form */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Insurance Details</h3>
            <div className="grid grid-cols-1 gap-3">
              <input name="company" value={selectedData.insurance.company} onChange={handleInsurance} className="border rounded-lg px-4 py-2" placeholder="Insurance Company Name" />
              <input name="policyNumber" value={selectedData.insurance.policyNumber} onChange={handleInsurance} className="border rounded-lg px-4 py-2" placeholder="Policy Number" />
              <input name="expiryDate" value={selectedData.insurance.expiryDate} onChange={handleInsurance} className="border rounded-lg px-4 py-2" type="date" placeholder="Expiry Date" />
            </div>
          </div>
          {/* Warranty Form */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Warranty Details</h3>
            <div className="grid grid-cols-1 gap-3">
              <input name="type" value={selectedData.warranty.type} onChange={handleWarranty} className="border rounded-lg px-4 py-2" placeholder="Warranty Type (e.g., Parts, Service)" />
              <input name="startDate" value={selectedData.warranty.startDate} onChange={handleWarranty} className="border rounded-lg px-4 py-2" type="date" placeholder="Start Date" />
              <input name="expiryDate" value={selectedData.warranty.expiryDate} onChange={handleWarranty} className="border rounded-lg px-4 py-2" type="date" placeholder="Expiry Date" />
              <input name="covered" value={selectedData.warranty.covered} onChange={handleWarranty} className="border rounded-lg px-4 py-2" placeholder="Covered Parts/Services" />
            </div>
          </div>
          {/* Reminders List and Add Form */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Reminders</h3>
            <form onSubmit={addReminder} className="flex flex-wrap gap-3 mb-4">
              <select name="type" value={reminderForm.type} onChange={handleReminder} className="border rounded-lg px-4 py-2">
                <option value="">Reminder Type</option>
                <option value="Insurance Renewal">Insurance Renewal</option>
                <option value="Warranty Expiry">Warranty Expiry</option>
                <option value="Next Service">Next Service</option>
              </select>
              <input name="date" value={reminderForm.date} onChange={handleReminder} className="border rounded-lg px-4 py-2" type="date" />
              <input name="notes" value={reminderForm.notes} onChange={handleReminder} className="border rounded-lg px-4 py-2" placeholder="Notes (optional)" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add</button>
            </form>
            <table className="min-w-full text-sm text-center border border-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-3 border">Type</th>
                  <th className="py-2 px-3 border">Date</th>
                  <th className="py-2 px-3 border">Notes</th>
                  <th className="py-2 px-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedData.reminders.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-6 text-gray-500">No reminders set.</td>
                  </tr>
                ) : (
                  selectedData.reminders.map((rem, idx) => {
                    // Calculate status
                    let status = 'Upcoming';
                    let color = 'bg-green-500';
                    if (rem.date) {
                      const today = new Date();
                      const remDate = new Date(rem.date);
                      const diffDays = Math.ceil((remDate - today) / (1000 * 60 * 60 * 24));
                      if (diffDays < 0) {
                        status = 'Overdue';
                        color = 'bg-red-500';
                      } else if (diffDays <= 7) {
                        status = 'Due Soon';
                        color = 'bg-orange-400';
                      }
                    }
                    return (
                      <tr key={idx} className="hover:bg-gray-100">
                        <td className="py-2 px-3 border">{rem.type}</td>
                        <td className="py-2 px-3 border">{rem.date}</td>
                        <td className="py-2 px-3 border">{rem.notes}</td>
                        <td className="py-2 px-3 border">
                          <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold ${color}`}>{status}</span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-gray-500 text-center py-12">Select a vehicle to manage insurance, warranty, and reminders.</div>
      )}
    </div>
  );
} 