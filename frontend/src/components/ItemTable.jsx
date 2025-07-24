import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEyeSlash, FaBell } from 'react-icons/fa';
import { FiFilePlus } from 'react-icons/fi';
import { useNavigate, useOutletContext } from 'react-router-dom';
import * as XLSX from 'xlsx';
import ItemForm from './ItemForm';

export default function ItemTable() {
  const navigate = useNavigate();
  const { items, setItems } = useOutletContext();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleAddItem = (item) => {
    setItems([...items, { ...item, id: Date.now(), minStock: 10, lastOrdered: new Date().toISOString().split('T')[0] }]);
    setShowForm(false);
  };

  const handleView = (item) => setViewItem(item);
  const handleEdit = (item) => {
    setEditItem(item);
    setEditMode(true);
    setShowForm(true);
  };
  const handleHide = (id) => alert(`Hide item with ID: ${id}`);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this item?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure to delete all items?')) {
      setItems([]);
    }
  };

  // Remove duplicate search box, keep only one
  // Update filteredItems to sort matches to the top
  const filteredItems = items
    .map((item, index) => ({ ...item, originalIndex: index }))
    .filter((item) => {
      const search = searchTerm.toLowerCase();
      return (
        item.name?.toLowerCase().includes(search) ||
        item.shortName?.toLowerCase().includes(search) ||
        item.category?.toLowerCase().includes(search) ||
        item.company?.toLowerCase().includes(search) ||
        item.supplier?.toLowerCase().includes(search) ||
        item.mrp?.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      // If search term is present, bring exact matches to the top
      const search = searchTerm.toLowerCase();
      const aMatch = a.name?.toLowerCase() === search;
      const bMatch = b.name?.toLowerCase() === search;
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      // Otherwise, keep original order
      return a.originalIndex - b.originalIndex;
    });

  // Calculate reorder alerts count
  const reorderAlertsCount = items.filter(item => {
    const currentStock = parseInt(item.quantity) || 0;
    const minStock = parseInt(item.minStock) || 10;
    return currentStock <= minStock;
  }).length;

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const formatted = jsonData.map((row, index) => ({
        id: Date.now() + index,
        name: row.Name || '',
        shortName: row['Short Name'] || '',
        category: row.Category || '',
        company: row.Company || '',
        supplier: row.Supplier || '',
        mrp: row.MRP || '',
        quantity: row.Quantity || 0,
        minStock: row['Min Stock'] || 10,
        lastOrdered: row['Last Ordered'] || new Date().toISOString().split('T')[0]
      }));

      setItems((prev) => [...prev, ...formatted]);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleExport = () => {
    const dataToExport = items.map(({ name, shortName, category, company, supplier, mrp, quantity, minStock, lastOrdered }) => ({
      Name: name,
      'Short Name': shortName,
      Category: category,
      Company: company,
      Supplier: supplier,
      MRP: mrp,
      Quantity: quantity,
      'Min Stock': minStock,
      'Last Ordered': lastOrdered
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');

    XLSX.writeFile(workbook, 'item_table.xlsx');
  };

  const handleFormSave = (item) => {
    if (editMode && editItem) {
      setItems(items.map((it) => (it.id === editItem.id ? { ...item, id: editItem.id } : it)));
    } else {
      setItems([...items, { ...item, id: Date.now() }]);
    }
    setShowForm(false);
    setEditMode(false);
    setEditItem(null);
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setEditMode(false);
    setEditItem(null);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      {/* Top Controls */}
      {!showForm && (
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
              onClick={() => setShowForm(true)}
            >
              <FiFilePlus /> Add Item
            </button>
            {/* Reorder Alerts Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 relative"
              onClick={() => navigate('/reorder-alerts')}
            >
              <FaBell /> Reorder Alerts
              {reorderAlertsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-300 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {reorderAlertsCount}
                </span>
              )}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Import Button */}
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleImport}
              className="hidden"
              id="excelImport"
            />
            <label
              htmlFor="excelImport"
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-100"
            >
              📁 Import Excel
            </label>
            {/* Export Button */}
            <button
              onClick={handleExport}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100"
            >
              ⬇ Export Excel
            </button>
            <button
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100"
              onClick={handleDeleteAll}
            >
              🗑 Delete All
            </button>
          </div>
          <input
            type="text"
            className="border rounded-lg px-4 py-2 w-60"
            placeholder="🔍 Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      {/* Form or Table */}
      {showForm ? (
        <ItemForm
          onSave={handleFormSave}
          onCancel={handleFormCancel}
          initialData={editItem}
          editMode={editMode}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-center border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-3 border">No</th>
                <th className="py-2 px-3 border">Name</th>
                <th className="py-2 px-3 border">Short Name</th>
                <th className="py-2 px-3 border">Category</th>
                <th className="py-2 px-3 border">Company</th>
                <th className="py-2 px-3 border">Supplier</th>
                <th className="py-2 px-3 border">MRP</th>
                <th className="py-2 px-3 border">Quantity</th>
                <th className="py-2 px-3 border">Min Stock</th>
                <th className="py-2 px-3 border">Branch</th>
                <th className="py-2 px-3 border">Status</th>
                <th className="py-2 px-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="11" className="py-6 text-gray-500">
                    No items found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, index) => {
                  const currentStock = parseInt(item.quantity) || 0;
                  const minStock = parseInt(item.minStock) || 10;
                  const stockStatus = currentStock === 0 ? 'Out of Stock' :
                                    currentStock <= minStock * 0.3 ? 'Critical' :
                                    currentStock <= minStock * 0.6 ? 'Low' :
                                    currentStock <= minStock ? 'Warning' : 'Good';
                  
                  const statusColor = currentStock === 0 ? 'bg-red-500' :
                                    currentStock <= minStock * 0.3 ? 'bg-red-400' :
                                    currentStock <= minStock * 0.6 ? 'bg-orange-400' :
                                    currentStock <= minStock ? 'bg-yellow-400' : 'bg-green-400';
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="py-2 px-3 border">{index + 1}</td>
                      <td className="py-2 px-3 border">{item.name}</td>
                      <td className="py-2 px-3 border">{item.shortName}</td>
                      <td className="py-2 px-3 border">{item.category}</td>
                      <td className="py-2 px-3 border">{item.company}</td>
                      <td className="py-2 px-3 border">{item.supplier}</td>
                      <td className="py-2 px-3 border">{item.mrp}</td>
                      <td className={`py-2 px-3 border font-semibold ${currentStock === 0 ? 'text-red-600' : currentStock <= minStock ? 'text-orange-600' : 'text-gray-800'}`}>
                        {item.quantity}
                      </td>
                      <td className="py-2 px-3 border">{item.minStock}</td>
                      <td className="py-2 px-3 border">{item.branch || '-'}</td>
                      <td className="py-2 px-3 border">
                        <div className="flex justify-center items-center h-full">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${statusColor}`}>
                            {stockStatus}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-3 border">
                        <div className="flex justify-center gap-2">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleView(item)}
                            title="View"
                          >
                            <FaEyeSlash />
                          </button>
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEdit(item)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-blue-400 hover:text-blue-700"
                            onClick={() => handleDelete(item.id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* View Item Dialog */}
      {viewItem && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.35)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          {/* Overlay for closing dialog when clicking outside */}
          <div
            onClick={() => setViewItem(null)}
            style={{
              position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'transparent', zIndex: 1
            }}
          />
          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              width: 400,
              height: 400,
              boxShadow: '0 8px 32px #0004',
              display: 'flex', flexDirection: 'column',
              gap: 16, border: '3px solid #2563eb',
              position: 'relative', zIndex: 2,
              justifyContent: 'center', alignItems: 'center',
              padding: 0
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close (X) button */}
            <button
              onClick={() => setViewItem(null)}
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
            <h3 style={{ fontWeight: 700, fontSize: 22, margin: '32px 0 12px 0', color: '#2563eb', textAlign: 'center', letterSpacing: 1 }}>Item Details</h3>
            <div style={{ width: '90%', flex: 1, overflowY: 'auto', margin: '0 auto' }}>
              <table style={{ width: '100%', fontSize: 16, borderCollapse: 'collapse', background: '#f8fafc', borderRadius: 8 }}>
                <tbody>
                  {Object.entries(viewItem).map(([key, value]) => (
                    <tr key={key}>
                      <td style={{ fontWeight: 600, padding: '7px 10px', textTransform: 'capitalize', color: '#222', borderBottom: '1px solid #e0e7ef', width: 120 }}>{key}</td>
                      <td style={{ padding: '7px 10px', color: '#333', borderBottom: '1px solid #e0e7ef' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', margin: '18px 0 0 0' }}>
              <button type="button" onClick={() => setViewItem(null)} style={{ padding: '10px 28px', borderRadius: 6, background: '#2563eb', color: '#fff', border: 0, fontWeight: 700, fontSize: 16, letterSpacing: 1 }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
