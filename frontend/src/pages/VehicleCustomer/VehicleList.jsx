import React, { useState } from 'react';
import { FaEye, FaEdit, FaClipboardList } from 'react-icons/fa';

export default function VehicleList({ vehicles, onAdd, onView, onEdit, onServiceHistory }) {
  const [search, setSearch] = useState('');

  const filtered = vehicles.filter(v =>
    v.make?.toLowerCase().includes(search.toLowerCase()) ||
    v.model?.toLowerCase().includes(search.toLowerCase()) ||
    v.vin?.toLowerCase().includes(search.toLowerCase()) ||
    v.regNo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-700">Vehicle List</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={onAdd}
        >
          + Add Vehicle
        </button>
      </div>
      <input
        type="text"
        className="border rounded-lg px-4 py-2 w-72 mb-4"
        placeholder="Search by make, model, VIN, reg no..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-3 border">Make</th>
              <th className="py-2 px-3 border">Model</th>
              <th className="py-2 px-3 border">VIN</th>
              <th className="py-2 px-3 border">Reg. No</th>
              <th className="py-2 px-3 border">Year</th>
              <th className="py-2 px-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-gray-500">No vehicles found.</td>
              </tr>
            ) : (
              filtered.map(vehicle => (
                <tr key={vehicle.id} className="hover:bg-gray-100">
                  <td className="py-2 px-3 border">{vehicle.make}</td>
                  <td className="py-2 px-3 border">{vehicle.model}</td>
                  <td className="py-2 px-3 border">{vehicle.vin}</td>
                  <td className="py-2 px-3 border">{vehicle.regNo}</td>
                  <td className="py-2 px-3 border">{vehicle.year}</td>
                  <td className="py-2 px-3 border">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => onView(vehicle)}
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => onEdit(vehicle)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => onServiceHistory(vehicle)}
                      title="Service History"
                    >
                      <FaClipboardList />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 