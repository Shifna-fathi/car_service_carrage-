import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

export default function BarcodeReader() {
  const [data, setData] = useState('No result');
  return (
    <div className="max-w-xl mx-auto bg-transparent rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Barcode Reader</h2>
      <BarcodeScannerComponent
        width={400}
        height={300}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
        }}
      />
      <p className="mt-4 text-lg text-center">Scanned: <span className="font-bold text-blue-700">{data}</span></p>
    </div>
  );
} 