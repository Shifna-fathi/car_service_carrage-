import React, { useState, useEffect } from 'react';
import { FiPackage, FiDollarSign, FiBox, FiTag, FiMapPin } from 'react-icons/fi';

export default function ItemForm({ onSave, onCancel, initialData, editMode }) {
  const [form, setForm] = useState(initialData || {
    itemId: '', name: '', shortName: '', expiry: '', barcode: '', mrp: '',
    cost: '', salesPrice: '', minPrice: '',
    minStock: '', quantity: '', openQty: '', openValue: '',
    category: '', type: '', supplier: '', company: '', unit: '',
    storeLocation: '', cabinet: '', row: '', branch: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogField, setDialogField] = useState('');
  const [dialogValue, setDialogValue] = useState('');
  // Store options for each classification field
  const [options, setOptions] = useState({
    category: [],
    type: [],
    supplier: [],
    company: [],
    unit: [],
    storeLocation: []
  });
  const [branches, setBranches] = useState([]);

  // If initialData changes (edit mode), update form
  React.useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  useEffect(() => {
    // Try to get branches from localStorage (set by BranchManagement)
    const stored = localStorage.getItem('branches');
    if (stored) {
      setBranches(JSON.parse(stored));
    }
  }, []);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const addNew = field => alert(`Add new ${field}`);
  const capitalize = label => label.charAt(0).toUpperCase() + label.slice(1);

  const openDialog = (field) => {
    setDialogField(field);
    setDialogValue('');
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
    setDialogField('');
    setDialogValue('');
  };
  const saveDialogValue = () => {
    setForm((prev) => ({ ...prev, [dialogField]: dialogValue }));
    setOptions((prev) => {
      if (!dialogValue || prev[dialogField]?.includes(dialogValue)) return prev;
      return { ...prev, [dialogField]: [...(prev[dialogField] || []), dialogValue] };
    });
    closeDialog();
  };

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#f3f4f6',
      fontFamily: 'Segoe UI, sans-serif',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      textAlign: 'center',
      color: '#1a1a1a',
    },
    section: {
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      borderRadius: '10px',
      padding: '1.5rem 2rem',
      marginBottom: '2rem',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      marginBottom: '1.2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(to right, #007bff, #00c6ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '1rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '0.3rem',
      fontWeight: '500',
      color: '#444',
    },
    input: {
      padding: '0.3rem 0.6rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '0.85rem',
    },
    inputWithButton: {
      display: 'flex',
      gap: '0.5rem',
    },
    addButton: {
      padding: '0.3rem 0.8rem',
      fontSize: '0.85rem',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    saveButton: {
      display: 'block',
      margin: '2rem auto 0',
      padding: '0.8rem 1.5rem',
      fontSize: '1rem',
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create New Product</h2>
      {/* Branch Selection */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Branch</h3>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Branch</label>
            <select
              name="branch"
              value={form.branch || ''}
              onChange={handle}
              style={styles.input}
              required
            >
              <option value="">-- Select Branch --</option>
              {branches.map(b => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}><FiPackage /> Basic Information</h3>
        <div style={styles.grid}>
          {['itemId', 'name', 'shortName', 'expiry', 'barcode', 'mrp'].map(f => (
            <div key={f} style={styles.formGroup}>
              <label style={styles.label}>{capitalize(f)}</label>
              <input name={f} value={form[f]} onChange={handle} style={styles.input} required />
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Information */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}><FiDollarSign /> Pricing Details</h3>
        <div style={styles.grid}>
          {['cost', 'salesPrice', 'minPrice'].map(f => (
            <div key={f} style={styles.formGroup}>
              <label style={styles.label}>{capitalize(f)}</label>
              <input name={f} value={form[f]} onChange={handle} style={styles.input} />
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Information */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}><FiBox /> Inventory Information</h3>
        <div style={styles.grid}>
          {['minStock', 'quantity', 'openQty', 'openValue'].map(f => (
            <div key={f} style={styles.formGroup}>
              <label style={styles.label}>{capitalize(f)}</label>
              <input name={f} value={form[f]} onChange={handle} style={styles.input} />
            </div>
          ))}
        </div>
      </div>

      {/* Classification */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}><FiTag /> Classification</h3>
        <div style={styles.grid}>
          {['category', 'type', 'supplier', 'company', 'unit'].map(f => (
            <div key={f} style={styles.formGroup}>
              <label style={styles.label}>{capitalize(f)}</label>
              <div style={styles.inputWithButton}>
                <select
                  name={f}
                  value={form[f]}
                  onChange={handle}
                  style={{ ...styles.input, flex: 1 }}
                >
                  <option value="">-- Select or add --</option>
                  {options[f].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <button type="button" style={styles.addButton} onClick={() => openDialog(f)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Store Information */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}><FiMapPin /> Store Information</h3>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Store Location</label>
            <div style={styles.inputWithButton}>
              <select
                name="storeLocation"
                value={form.storeLocation}
                onChange={handle}
                style={{ ...styles.input, flex: 1 }}
              >
                <option value="">-- Select or add --</option>
                {options.storeLocation.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <button type="button" style={styles.addButton} onClick={() => openDialog('storeLocation')}>+</button>
            </div>
          </div>
          {['cabinet', 'row'].map(f => (
            <div key={f} style={styles.formGroup}>
              <label style={styles.label}>{capitalize(f)}</label>
              <input name={f} value={form[f]} onChange={handle} style={styles.input} />
            </div>
          ))}
        </div>
      </div>

      <button
        style={styles.saveButton}
        onClick={(e) => {
          e.preventDefault();
          onSave(form);
        }}
      >
        {editMode ? 'Update' : 'Save'}
      </button>
      {onCancel && (
        <button
          style={{ ...styles.saveButton, backgroundColor: '#aaa', marginLeft: 16 }}
          onClick={onCancel}
        >
          Cancel
        </button>
      )}

      {/* Dialog for adding new classification value */}
      {dialogOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 32, minWidth: 320, boxShadow: '0 2px 16px #0002', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ fontWeight: 600, fontSize: 18 }}>Add New {capitalize(dialogField)}</h3>
            <input
              autoFocus
              value={dialogValue}
              onChange={e => setDialogValue(e.target.value)}
              style={{ padding: 8, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }}
              placeholder={`Enter new ${dialogField}`}
            />
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button type="button" onClick={closeDialog} style={{ padding: '8px 18px', borderRadius: 4, background: '#aaa', color: '#fff', border: 0, fontWeight: 600 }}>Cancel</button>
              <button type="button" onClick={saveDialogValue} style={{ padding: '8px 18px', borderRadius: 4, background: '#2563eb', color: '#fff', border: 0, fontWeight: 600 }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
