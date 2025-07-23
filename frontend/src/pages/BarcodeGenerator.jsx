import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';

export default function BarcodeGenerator() {
  const [value, setValue] = useState('');
  const printRef = useRef();

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContents = printRef.current.innerHTML;
    const win = window.open('', '', 'width=600,height=400');
    win.document.write('<html><head><title>Print Barcode</title></head><body style="display:flex;justify-content:center;align-items:center;height:100vh;">');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <div className="max-w-xl mx-auto bg-transparent rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Barcode Generator</h2>
      <input
        className="border rounded-lg px-4 py-2 mb-4 w-full"
        placeholder="Enter value to generate barcode"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      {value && (
        <div className="flex flex-col items-center mt-4">
          <div ref={printRef}>
            <Barcode value={value} />
            <p className="mt-2 text-gray-600">{value}</p>
          </div>
          <button
            onClick={handlePrint}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Print Barcode
          </button>
        </div>
      )}
    </div>
  );
} 