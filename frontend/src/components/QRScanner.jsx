// frontend/src/components/QRScanner.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";

const QRScanner = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleScan = (data) => {
    if (data) {
      // Extract code from QR
      navigate(`/feedback/${data.replace(/^DEP-|^EMP-/, "")}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Failed to scan QR code. Try again!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold mb-4">Scan QR Code</h1>

      <div className="w-80 h-80 border rounded-lg overflow-hidden">
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (!!result) handleScan(result?.text);
            if (!!error) handleError(error);
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default QRScanner;
