import React, { useState } from 'react';
import CustomerForm from './CustomerForm';

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [viewCustomer, setViewCustomer] = useState(null);

  const handleAdd = () => {
    setEditMode(false);
    setEditCustomer(null);
    setShowForm(true);
  };

  const handleView = (customer) => {
    setViewCustomer(customer);
  };

  const handleEdit = (customer) => {
    setEditMode(true);
    setEditCustomer(customer);
    setShowForm(true);
  };

  const handleSave = (customer) => {
    if (editMode && editCustomer) {
      setCustomers(customers.map(c => c === editCustomer ? { ...customer, id: editCustomer.id } : c));
    } else {
      setCustomers([...customers, { ...customer, id: Date.now() }]);
    }
    setShowForm(false);
    setEditMode(false);
    setEditCustomer(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditMode(false);
    setEditCustomer(null);
  };

  return (
    <div>
      {!showForm && (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-700">Customer List</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={handleAdd}
            >
              + Add Customer
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-center border border-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-3 border">Name</th>
                  <th className="py-2 px-3 border">Contact</th>
                  <th className="py-2 px-3 border">Email</th>
                  <th className="py-2 px-3 border">Loyalty Points</th>
                  <th className="py-2 px-3 border">Preferences</th>
                  <th className="py-2 px-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-6 text-gray-500">No customers found.</td>
                  </tr>
                ) : (
                  customers.map(customer => (
                    <tr key={customer.id} className="hover:bg-gray-100">
                      <td className="py-2 px-3 border">{customer.name}</td>
                      <td className="py-2 px-3 border">{customer.contact}</td>
                      <td className="py-2 px-3 border">{customer.email}</td>
                      <td className="py-2 px-3 border font-bold text-blue-700">{customer.loyaltyPoints}</td>
                      <td className="py-2 px-3 border text-left">
                        <div><b>Package:</b> {customer.preferredPackage}</div>
                        <div><b>Oil:</b> {customer.oilBrand}</div>
                        <div><b>Tire:</b> {customer.tireType}</div>
                        <div><b>Comm:</b> {customer.preferredCommunication}</div>
                      </td>
                      <td className="py-2 px-3 border">
                        <button
                          className="text-blue-600 hover:underline mr-2"
                          onClick={() => handleView(customer)}
                        >
                          View
                        </button>
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => handleEdit(customer)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showForm && (
        <CustomerForm
          initialData={editCustomer}
          onSave={handleSave}
          onCancel={handleCancel}
          editMode={editMode}
        />
      )}
      {/* View Customer Dialog */}
      {viewCustomer && (
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
              onClick={() => setViewCustomer(null)}
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
            <h3 style={{ fontWeight: 700, fontSize: 22, margin: '32px 0 12px 0', color: '#2563eb', textAlign: 'center', letterSpacing: 1 }}>Customer Details</h3>
            <div style={{ width: '90%', flex: 1, overflowY: 'auto', margin: '0 auto' }}>
              <table style={{ width: '100%', fontSize: 16, borderCollapse: 'collapse', background: '#f8fafc', borderRadius: 8 }}>
                <tbody>
                  {Object.entries(viewCustomer).map(([key, value]) => (
                    <tr key={key}>
                      <td style={{ fontWeight: 600, padding: '7px 10px', textTransform: 'capitalize', color: '#222', borderBottom: '1px solid #e0e7ef', width: 120 }}>{key}</td>
                      <td style={{ padding: '7px 10px', color: '#333', borderBottom: '1px solid #e0e7ef' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', margin: '18px 0 0 0' }}>
              <button type="button" onClick={() => setViewCustomer(null)} style={{ padding: '10px 28px', borderRadius: 6, background: '#2563eb', color: '#fff', border: 0, fontWeight: 700, fontSize: 16, letterSpacing: 1 }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 