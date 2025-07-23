import React, { useState } from 'react';

export default function CustomerPreferences({ onSave }) {
  const [prefs, setPrefs] = useState({
    timeSlot: '',
    communication: '',
    package: ''
  });
  const [options, setOptions] = useState({
    timeSlot: ['Morning', 'Afternoon'],
    communication: ['SMS', 'Email', 'WhatsApp'],
    package: []
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogField, setDialogField] = useState('');
  const [dialogValue, setDialogValue] = useState('');

  const handle = e => setPrefs({ ...prefs, [e.target.name]: e.target.value });

  const savePreferences = () => {
    if (onSave) onSave(prefs);
    alert('Preferences saved!');
  };

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
    setOptions(prev => {
      if (!dialogValue || prev[dialogField]?.includes(dialogValue)) return prev;
      return { ...prev, [dialogField]: [...(prev[dialogField] || []), dialogValue] };
    });
    setPrefs(prev => ({ ...prev, [dialogField]: dialogValue }));
    closeDialog();
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Customer Preferences</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <div className="text-sm font-semibold text-blue-700 mb-1">Time Slot</div>
          <div className="flex gap-2 items-center">
            <select name="timeSlot" value={prefs.timeSlot} onChange={handle} className="border rounded-lg px-4 py-2 flex-1">
              {options.timeSlot.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <button type="button" className="bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700" onClick={() => openDialog('timeSlot')}>+</button>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-blue-700 mb-1">Communication Preference</div>
          <div className="flex gap-2 items-center">
            <select name="communication" value={prefs.communication} onChange={handle} className="border rounded-lg px-4 py-2 flex-1">
              {options.communication.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <button type="button" className="bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700" onClick={() => openDialog('communication')}>+</button>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-blue-700 mb-1">Favorite Service Package</div>
          <div className="flex gap-2 items-center">
            <select name="package" value={prefs.package} onChange={handle} className="border rounded-lg px-4 py-2 flex-1">
              {options.package.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <button type="button" className="bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700" onClick={() => openDialog('package')}>+</button>
          </div>
        </div>
      </div>
      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={savePreferences}
      >
        Save
      </button>
      {/* Dialog for adding new option */}
      {dialogOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 32, minWidth: 320, boxShadow: '0 2px 16px #0002', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ fontWeight: 600, fontSize: 18 }}>Add New {dialogField.charAt(0).toUpperCase() + dialogField.slice(1)}</h3>
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