import React, { useState } from 'react';
import VehicleList from './VehicleList';
import VehicleForm from './VehicleForm';

const mockCustomers = [
  { id: 1, name: 'John Doe', contact: '9876543210' },
  { id: 2, name: 'Jane Smith', contact: '9123456789' }
];

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);
  const [viewVehicle, setViewVehicle] = useState(null);
  const [showServiceHistory, setShowServiceHistory] = useState(false);
  const [serviceHistoryVehicleId, setServiceHistoryVehicleId] = useState(null);
  const [serviceForm, setServiceForm] = useState({ date: '', type: '', mechanic: '', cost: '', nextDue: '' });

  const handleAdd = () => {
    setEditMode(false);
    setEditVehicle(null);
    setShowForm(true);
  };

  const handleView = (vehicle) => {
    setViewVehicle(vehicle);
  };

  const handleEdit = (vehicle) => {
    setEditMode(true);
    setEditVehicle(vehicle);
    setShowForm(true);
  };

  const handleSave = (vehicle) => {
    if (editMode && editVehicle) {
      setVehicles(vehicles.map(v => v.id === editVehicle.id ? { ...vehicle, id: editVehicle.id, serviceHistory: v.serviceHistory || [] } : v));
    } else {
      setVehicles([...vehicles, { ...vehicle, id: Date.now(), serviceHistory: [] }]);
    }
    setShowForm(false);
    setEditMode(false);
    setEditVehicle(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditMode(false);
    setEditVehicle(null);
  };

  const handleShowServiceHistory = (vehicle) => {
    setServiceHistoryVehicleId(vehicle.id);
    setShowServiceHistory(true);
    setServiceForm({ date: '', type: '', mechanic: '', cost: '', nextDue: '' });
  };

  const handleCloseServiceHistory = () => {
    setShowServiceHistory(false);
    setServiceHistoryVehicleId(null);
  };

  const handleServiceForm = e => setServiceForm({ ...serviceForm, [e.target.name]: e.target.value });
  const addServiceRecord = e => {
    e.preventDefault();
    if (!serviceForm.date || !serviceForm.type) return;
    setVehicles(vehicles.map(v =>
      v.id === serviceHistoryVehicleId
        ? { ...v, serviceHistory: [...(v.serviceHistory || []), serviceForm] }
        : v
    ));
    setServiceForm({ date: '', type: '', mechanic: '', cost: '', nextDue: '' });
  };

  // Helper to get customer name by id
  const getCustomerName = (id) => {
    const c = mockCustomers.find(c => c.id === Number(id));
    return c ? `${c.name} (${c.contact})` : '';
  };

  // Always get the latest vehicle object for service history
  const serviceHistoryVehicle = vehicles.find(v => v.id === serviceHistoryVehicleId);

  return (
    <div>
      {!showForm && (
        <VehicleList
          vehicles={vehicles}
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onServiceHistory={handleShowServiceHistory}
        />
      )}
      {showForm && (
        <VehicleForm
          initialData={editVehicle}
          onSave={handleSave}
          onCancel={handleCancel}
          editMode={editMode}
          customers={mockCustomers}
        />
      )}
      {/* View Vehicle Dialog */}
      {viewVehicle && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.35)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              width: 400,
              minHeight: 400,
              boxShadow: '0 8px 32px #0004',
              display: 'flex', flexDirection: 'column',
              gap: 16, border: '3px solid #2563eb',
              position: 'relative', zIndex: 2,
              justifyContent: 'center', alignItems: 'center',
              padding: 0
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setViewVehicle(null)}
              style={{
                position: 'absolute',
                top: 8, right: 16,
                background: 'transparent',
                border: 'none',
                fontSize: 26,
                color: '#2563eb',
                cursor: 'pointer',
                fontWeight: 700,
                zIndex: 3
              }}
              title="Close"
            >
              ×
            </button>
            <h3 style={{ fontWeight: 700, fontSize: 22, margin: '32px 0 12px 0', color: '#2563eb', textAlign: 'center', letterSpacing: 1 }}>Vehicle Details</h3>
            <div style={{ width: '90%', flex: 1, overflowY: 'auto', margin: '0 auto' }}>
              <table style={{ width: '100%', fontSize: 16, borderCollapse: 'collapse', background: '#f8fafc', borderRadius: 8 }}>
                <tbody>
                  {Object.entries(viewVehicle).map(([key, value]) => (
                    key !== 'serviceHistory' && key !== 'customerId' && (
                      <tr key={key}>
                        <td style={{ fontWeight: 600, padding: '7px 10px', textTransform: 'capitalize', color: '#222', borderBottom: '1px solid #e0e7ef', width: 120 }}>{key}</td>
                        <td style={{ padding: '7px 10px', color: '#333', borderBottom: '1px solid #e0e7ef' }}>{value}</td>
                      </tr>
                    )
                  ))}
                  <tr>
                    <td style={{ fontWeight: 600, padding: '7px 10px', textTransform: 'capitalize', color: '#222', borderBottom: '1px solid #e0e7ef', width: 120 }}>Odometer</td>
                    <td style={{ padding: '7px 10px', color: '#333', borderBottom: '1px solid #e0e7ef' }}>{viewVehicle.odometer}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, padding: '7px 10px', textTransform: 'capitalize', color: '#222', borderBottom: '1px solid #e0e7ef', width: 120 }}>Customer</td>
                    <td style={{ padding: '7px 10px', color: '#333', borderBottom: '1px solid #e0e7ef' }}>{getCustomerName(viewVehicle.customerId)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', margin: '18px 0 0 0', marginTop: 'auto', paddingBottom: 32 }}>
              <button type="button" onClick={() => setViewVehicle(null)} style={{ padding: '6px 22px', borderRadius: 9999, background: '#2563eb', color: '#fff', border: 0, fontWeight: 600, fontSize: 14, letterSpacing: 1 }}>Close</button>
              <button type="button" onClick={() => { setViewVehicle(null); handleEdit(viewVehicle); }} style={{ padding: '6px 22px', borderRadius: 9999, background: '#1e40af', color: '#fff', border: 0, fontWeight: 600, fontSize: 14, letterSpacing: 1 }}>Edit</button>
              <button type="button" onClick={() => { setViewVehicle(null); handleShowServiceHistory(viewVehicle); }} style={{ padding: '6px 22px', borderRadius: 9999, background: '#0ea5e9', color: '#fff', border: 0, fontWeight: 600, fontSize: 14, letterSpacing: 1 }}>Service History</button>
            </div>
          </div>
        </div>
      )}
      {/* Service History Dialog */}
      {showServiceHistory && serviceHistoryVehicle && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.35)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              width: 480,
              minHeight: 320,
              boxShadow: '0 8px 32px #0004',
              display: 'flex', flexDirection: 'column',
              gap: 16, border: '3px solid #0ea5e9',
              position: 'relative', zIndex: 2,
              justifyContent: 'center', alignItems: 'center',
              padding: 0
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={handleCloseServiceHistory}
              style={{
                position: 'absolute',
                top: 8, right: 16,
                background: 'transparent',
                border: 'none',
                fontSize: 26,
                color: '#0ea5e9',
                cursor: 'pointer',
                fontWeight: 700,
                zIndex: 3
              }}
              title="Close"
            >
              ×
            </button>
            <h3 style={{ fontWeight: 700, fontSize: 22, margin: '32px 0 12px 0', color: '#0ea5e9', textAlign: 'center', letterSpacing: 1 }}>Service History</h3>
            {/* Add Service Record Form */}
            <form onSubmit={addServiceRecord} className="flex flex-wrap gap-3 mb-4 w-11/12 mx-auto">
              <input name="date" value={serviceForm.date} onChange={handleServiceForm} className="border rounded-lg px-4 py-2 flex-1" type="date" placeholder="Date" required />
              <input name="type" value={serviceForm.type} onChange={handleServiceForm} className="border rounded-lg px-4 py-2 flex-1" placeholder="Type of Service" required />
              <input name="mechanic" value={serviceForm.mechanic} onChange={handleServiceForm} className="border rounded-lg px-4 py-2 flex-1" placeholder="Mechanic Name" />
              <input name="cost" value={serviceForm.cost} onChange={handleServiceForm} className="border rounded-lg px-4 py-2 flex-1" placeholder="Cost" type="number" min="0" />
              <input name="nextDue" value={serviceForm.nextDue} onChange={handleServiceForm} className="border rounded-lg px-4 py-2 flex-1" placeholder="Next Service Due Date" type="date" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add</button>
            </form>
            <div style={{ maxHeight: 220, maxWidth: '100%', overflowY: 'auto', overflowX: 'auto', margin: '0 auto', width: '95%' }}>
            <table className="min-w-full text-sm text-center border border-gray-300 w-11/12 mx-auto">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-3 border">Date</th>
                  <th className="py-2 px-3 border">Type</th>
                  <th className="py-2 px-3 border">Mechanic</th>
                  <th className="py-2 px-3 border">Cost</th>
                  <th className="py-2 px-3 border">Next Service Due Date</th>
                </tr>
              </thead>
              <tbody>
                {(serviceHistoryVehicle.serviceHistory || []).length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-gray-500">No service records yet.</td>
                  </tr>
                ) : (
                  serviceHistoryVehicle.serviceHistory.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-gray-100">
                      <td className="py-2 px-3 border">{entry.date}</td>
                      <td className="py-2 px-3 border">{entry.type}</td>
                      <td className="py-2 px-3 border">{entry.mechanic}</td>
                      <td className="py-2 px-3 border">{entry.cost}</td>
                      <td className="py-2 px-3 border">{entry.nextDue}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', margin: '18px 0 0 0', marginTop: 'auto', paddingBottom: 32 }}>
              <button type="button" onClick={handleCloseServiceHistory} style={{ padding: '6px 22px', borderRadius: 9999, background: '#0ea5e9', color: '#fff', border: 0, fontWeight: 600, fontSize: 14, letterSpacing: 1 }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 