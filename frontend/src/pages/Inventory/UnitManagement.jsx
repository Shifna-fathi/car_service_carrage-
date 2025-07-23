import React, { useState } from "react";

const initialUnits = [
  { id: 1, name: "Piece", symbol: "pc", baseUnit: "", conversion: 1 },
  { id: 2, name: "Box", symbol: "bx", baseUnit: "Piece", conversion: 12 },
  { id: 3, name: "Litre", symbol: "L", baseUnit: "", conversion: 1 },
  { id: 4, name: "Gallon", symbol: "gal", baseUnit: "Litre", conversion: 3.785 },
];

const UnitManagement = () => {
  const [units, setUnits] = useState(initialUnits);
  const [form, setForm] = useState({ name: "", symbol: "", baseUnit: "", conversion: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const resetForm = () => {
    setForm({ name: "", symbol: "", baseUnit: "", conversion: "" });
    setEditingId(null);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.symbol.trim()) {
      setError("Unit name and symbol are required.");
      return false;
    }
    if (
      units.some(
        (u) =>
          u.name.toLowerCase() === form.name.trim().toLowerCase() &&
          (editingId === null || u.id !== editingId)
      )
    ) {
      setError("Duplicate unit name.");
      return false;
    }
    if (form.baseUnit && (!form.conversion || isNaN(Number(form.conversion)) || Number(form.conversion) <= 0)) {
      setError("Valid conversion factor required for derived units.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (editingId) {
      setUnits((prev) =>
        prev.map((u) =>
          u.id === editingId
            ? {
                ...u,
                name: form.name.trim(),
                symbol: form.symbol.trim(),
                baseUnit: form.baseUnit,
                conversion: form.baseUnit ? Number(form.conversion) : 1,
              }
            : u
        )
      );
    } else {
      setUnits((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: form.name.trim(),
          symbol: form.symbol.trim(),
          baseUnit: form.baseUnit,
          conversion: form.baseUnit ? Number(form.conversion) : 1,
        },
      ]);
    }
    resetForm();
  };

  const handleEdit = (unit) => {
    setForm({
      name: unit.name,
      symbol: unit.symbol,
      baseUnit: unit.baseUnit,
      conversion: unit.baseUnit ? unit.conversion : "",
    });
    setEditingId(unit.id);
    setError("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this unit?")) {
      setUnits((prev) => prev.filter((u) => u.id !== id));
      if (editingId === id) resetForm();
    }
  };

  // Search filter
  const filteredUnits = units.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0001", padding: 32 }}>
      <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Unit Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "end" }}>
        <div style={{ flex: 1, minWidth: 120 }}>
          <label>Unit Name<br />
            <input name="name" value={form.name} onChange={handleChange} style={{ width: "100%", padding: 6, borderRadius: 4, border: "1px solid #ccc" }} />
          </label>
        </div>
        <div style={{ flex: 1, minWidth: 100 }}>
          <label>Symbol<br />
            <input name="symbol" value={form.symbol} onChange={handleChange} style={{ width: "100%", padding: 6, borderRadius: 4, border: "1px solid #ccc" }} />
          </label>
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <label>Base Unit<br />
            <select name="baseUnit" value={form.baseUnit} onChange={handleChange} style={{ width: "100%", padding: 6, borderRadius: 4, border: "1px solid #ccc" }}>
              <option value="">-- None --</option>
              {units.filter(u => !u.baseUnit).map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </label>
        </div>
        {form.baseUnit && (
          <div style={{ flex: 1, minWidth: 120 }}>
            <label>Conversion Factor<br />
              <input name="conversion" value={form.conversion} onChange={handleChange} type="number" min="0.0001" step="any" style={{ width: "100%", padding: 6, borderRadius: 4, border: "1px solid #ccc" }} />
              <span style={{ fontSize: 12, color: "#888" }}>1 {form.name || "[Unit]"} = {form.conversion || "?"} {form.baseUnit}</span>
            </label>
          </div>
        )}
        <div>
          <button type="submit" style={{ padding: "8px 18px", borderRadius: 4, background: "#2563eb", color: "#fff", border: 0, fontWeight: 600 }}>
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ marginLeft: 8, padding: "8px 18px", borderRadius: 4, background: "#aaa", color: "#fff", border: 0, fontWeight: 600 }}>
              Cancel
            </button>
          )}
        </div>
        {error && <div style={{ color: "#d32f2f", width: "100%", marginTop: 4 }}>{error}</div>}
      </form>
      {/* Search bar */}
      <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: "1px solid #bbb", width: 300, fontSize: 16 }}
        />
        <button
          onClick={() => setSearch("")}
          style={{ padding: "7px 16px", borderRadius: 4, background: "#eee", color: "#333", border: 0, fontWeight: 500 }}
          disabled={!search}
        >
          Clear
        </button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#f9f9f9", fontSize: 18 }}>
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              <th style={{ padding: 14, border: "1px solid #eee" }}>Name</th>
              <th style={{ padding: 14, border: "1px solid #eee" }}>Symbol</th>
              <th style={{ padding: 14, border: "1px solid #eee" }}>Base Unit</th>
              <th style={{ padding: 14, border: "1px solid #eee" }}>Conversion</th>
              <th style={{ padding: 14, border: "1px solid #eee" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUnits.map((u) => (
              <tr key={u.id}>
                <td style={{ padding: 14, border: "1px solid #eee" }}>{u.name}</td>
                <td style={{ padding: 14, border: "1px solid #eee" }}>{u.symbol}</td>
                <td style={{ padding: 14, border: "1px solid #eee" }}>{u.baseUnit || "-"}</td>
                <td style={{ padding: 14, border: "1px solid #eee" }}>{u.baseUnit ? `1 ${u.name} = ${u.conversion} ${u.baseUnit}` : "-"}</td>
                <td style={{ padding: 14, border: "1px solid #eee" }}>
                  <button onClick={() => handleEdit(u)} style={{ marginRight: 8, padding: "6px 14px", borderRadius: 4, background: "#f59e42", color: "#fff", border: 0, fontSize: 16 }}>Edit</button>
                  <button onClick={() => handleDelete(u.id)} style={{ padding: "6px 14px", borderRadius: 4, background: "#d32f2f", color: "#fff", border: 0, fontSize: 16 }}>Delete</button>
                </td>
              </tr>
            ))}
            {filteredUnits.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: 24, color: "#888", fontSize: 18 }}>No units found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnitManagement; 