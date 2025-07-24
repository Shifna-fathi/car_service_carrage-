import React, { useState } from "react";

const initialEntities = {
  customer: [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ],
  vendor: [
    { id: 1, name: "Acme Supplies" },
    { id: 2, name: "Global Parts" },
  ],
};

export default function EntityLedger() {
  const [entityType, setEntityType] = useState("customer");
  const [entities, setEntities] = useState(initialEntities);
  const [selectedEntityId, setSelectedEntityId] = useState("");
  const [transactions, setTransactions] = useState({}); // { entityType_entityId: [ ... ] }
  const [form, setForm] = useState({ date: "", type: "receipt", amount: "", description: "" });
  const [showAddEntity, setShowAddEntity] = useState(false);
  const [newEntityName, setNewEntityName] = useState("");

  const entityList = entities[entityType];
  const entityKey = `${entityType}_${selectedEntityId}`;
  const entityTransactions = transactions[entityKey] || [];

  const handleEntityTypeChange = (e) => {
    setEntityType(e.target.value);
    setSelectedEntityId("");
  };

  const handleEntityChange = (e) => {
    setSelectedEntityId(e.target.value);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!selectedEntityId || !form.date || !form.amount) return;
    const tx = {
      ...form,
      amount: parseFloat(form.amount),
      id: Date.now(),
    };
    setTransactions((prev) => ({
      ...prev,
      [entityKey]: [...(prev[entityKey] || []), tx],
    }));
    setForm({ date: "", type: "receipt", amount: "", description: "" });
  };

  const handleAddEntity = (e) => {
    e.preventDefault();
    if (!newEntityName.trim()) return;
    setEntities((prev) => ({
      ...prev,
      [entityType]: [
        ...prev[entityType],
        { id: Date.now(), name: newEntityName.trim() },
      ],
    }));
    setNewEntityName("");
    setShowAddEntity(false);
  };

  // Calculate running balance
  let runningBalance = 0;
  const txRows = entityTransactions.map((tx, idx) => {
    runningBalance += tx.type === "receipt" ? tx.amount : -tx.amount;
    return (
      <tr key={tx.id}>
        <td className="py-2 px-3 border">{tx.date}</td>
        <td className="py-2 px-3 border">{tx.type === "receipt" ? "Receipt" : "Payment"}</td>
        <td className="py-2 px-3 border">{tx.description}</td>
        <td className="py-2 px-3 border text-green-700">{tx.type === "receipt" ? tx.amount.toFixed(2) : "-"}</td>
        <td className="py-2 px-3 border text-red-700">{tx.type === "payment" ? tx.amount.toFixed(2) : "-"}</td>
        <td className="py-2 px-3 border font-bold">{runningBalance.toFixed(2)}</td>
      </tr>
    );
  });

  const handlePrint = () => {
    const printContent = document.getElementById("entity-ledger-print").innerHTML;
    const win = window.open("", "PrintWindow");
    win.document.write(`
      <html><head><title>Entity Ledger</title>
      <style>
        body { font-family: Arial; margin: 40px; }
        h2 { color: #2563eb; }
        table { width: 100%; border-collapse: collapse; font-size: 18px; }
        th, td { border: 1px solid #ddd; padding: 10px; }
        th { background: #2563eb; color: #fff; }
        tr:nth-child(even) { background: #f1f5fa; }
      </style>
      </head><body>` + printContent + `</body></html>`);
    win.document.close();
    win.print();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Entity Ledger (Statement)</h2>
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div>
          <label className="block text-blue-700 font-semibold mb-1">Entity Type</label>
          <select value={entityType} onChange={handleEntityTypeChange} className="border rounded-lg px-4 py-2">
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
          </select>
        </div>
        <div>
          <label className="block text-blue-700 font-semibold mb-1">Select {entityType.charAt(0).toUpperCase() + entityType.slice(1)}</label>
          <div className="flex gap-2">
            <select value={selectedEntityId} onChange={handleEntityChange} className="border rounded-lg px-4 py-2">
              <option value="">-- Select --</option>
              {entityList.map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg" onClick={() => setShowAddEntity(true)} type="button">+</button>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-auto" onClick={handlePrint} type="button">Print</button>
      </div>
      {showAddEntity && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-bold mb-2 text-blue-700">Add {entityType.charAt(0).toUpperCase() + entityType.slice(1)}</h3>
            <form onSubmit={handleAddEntity} className="flex flex-col gap-3">
              <input
                className="border rounded-lg px-3 py-2"
                placeholder="Name"
                value={newEntityName}
                onChange={e => setNewEntityName(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" type="submit">Save</button>
                <button className="bg-gray-400 text-white px-4 py-2 rounded-lg" type="button" onClick={() => setShowAddEntity(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {selectedEntityId && (
        <>
          <form onSubmit={handleAddTransaction} className="flex flex-wrap gap-4 mb-6 items-end">
            <div>
              <label className="block text-blue-700 font-semibold mb-1">Date</label>
              <input type="date" name="date" value={form.date} onChange={handleFormChange} className="border rounded-lg px-4 py-2" required />
            </div>
            <div>
              <label className="block text-blue-700 font-semibold mb-1">Type</label>
              <select name="type" value={form.type} onChange={handleFormChange} className="border rounded-lg px-4 py-2">
                <option value="receipt">Receipt</option>
                <option value="payment">Payment</option>
              </select>
            </div>
            <div>
              <label className="block text-blue-700 font-semibold mb-1">Amount</label>
              <input type="number" name="amount" value={form.amount} onChange={handleFormChange} className="border rounded-lg px-4 py-2" required min="0.01" step="0.01" />
            </div>
            <div>
              <label className="block text-blue-700 font-semibold mb-1">Description</label>
              <input type="text" name="description" value={form.description} onChange={handleFormChange} className="border rounded-lg px-4 py-2" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" type="submit">Add</button>
          </form>
          <div id="entity-ledger-print">
            <h3 className="text-xl font-bold text-blue-700 mb-2">{entityType.charAt(0).toUpperCase() + entityType.slice(1)} Statement</h3>
            <p className="mb-2"><b>Name:</b> {entityList.find(e => e.id == selectedEntityId)?.name}</p>
            <table className="min-w-full text-sm text-center border border-gray-300 mb-6">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="py-2 px-3 border">Date</th>
                  <th className="py-2 px-3 border">Type</th>
                  <th className="py-2 px-3 border">Description</th>
                  <th className="py-2 px-3 border">Receipt</th>
                  <th className="py-2 px-3 border">Payment</th>
                  <th className="py-2 px-3 border">Balance</th>
                </tr>
              </thead>
              <tbody>
                {entityTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-6 text-gray-500">No transactions found.</td>
                  </tr>
                ) : (
                  (() => {
                    let balance = 0;
                    return entityTransactions.map((tx, idx) => {
                      balance += tx.type === "receipt" ? tx.amount : -tx.amount;
                      return (
                        <tr key={tx.id}>
                          <td className="py-2 px-3 border">{tx.date}</td>
                          <td className="py-2 px-3 border">{tx.type === "receipt" ? "Receipt" : "Payment"}</td>
                          <td className="py-2 px-3 border">{tx.description}</td>
                          <td className="py-2 px-3 border text-green-700">{tx.type === "receipt" ? tx.amount.toFixed(2) : "-"}</td>
                          <td className="py-2 px-3 border text-red-700">{tx.type === "payment" ? tx.amount.toFixed(2) : "-"}</td>
                          <td className="py-2 px-3 border font-bold">{balance.toFixed(2)}</td>
                        </tr>
                      );
                    });
                  })()
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
} 