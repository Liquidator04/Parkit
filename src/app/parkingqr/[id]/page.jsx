"use client";
import { useEffect, useRef } from "react";
import QRCode from "qrcode-generator";

const QRPage = ({ params }) => {
  const { id: orderId } = params; // Destructure to get the orderId
  const canvasRef = useRef(null);

  useEffect(() => {
    if (orderId) {
      const qr = QRCode(0, 'L');
      qr.addData(`Order ID: ${orderId}`);
      qr.make();

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const size = 256; // Size of the QR code
      canvas.width = size;
      canvas.height = size;

      // Draw the QR code on the canvas
      const qrData = qr.createDataURL(4);
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = qrData; // Use the generated data URL
    }
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Your QR Code</h1>
      <p className="text-xl mb-6 text-gray-700">Order ID: {orderId}</p>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default QRPage;
