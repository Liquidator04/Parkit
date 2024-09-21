"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode-generator";

const QRPage = ({params}) => {
  const router = useRouter();
  console.log(params.id);
  const { orderId } = params.id
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    if (orderId) {
      // Generate the QR code
      const qr = QRCode(0, 'L'); // 0 for numeric, 'L' for error correction level
      qr.addData(`Order ID: ${orderId}`);
      qr.make();
      setQrCode(qr.createDataURL(4)); // 4 is the size
    }
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Your QR Code</h1>
      <p className="text-xl mb-6 text-gray-700">Order ID: {orderId}</p>
      {qrCode && (
        <img src={qrCode} alt="QR Code" />
      )}
    </div>
  );
};

export default QRPage;
