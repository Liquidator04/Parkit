"use client";
import { useEffect, useRef } from "react";
import QRCode from "qrcode-generator";
import { CardWithForm } from "@/components/card";
import review from "../../public/review.jpg"


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
    <>

    <div className="flex justify-evenly items-center min-h-screen"
    style={{
      backgroundImage: `url(${review})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    
    >
      
      <CardWithForm/>
  <div className="relative border border-gray-300 rounded-lg shadow-lg inline-block">
    {/* Glowing lines */}
    <div className="absolute left-[-15px] top-0 h-full w-1 bg-blue-500 glow"></div>
    <div className="absolute right-[-15px] top-0 h-full w-1 bg-blue-500 glow"></div>

    <div className="flex flex-col items-center justify-center bg-white rounded-lg">
      <h1 className="text-xl font-bold mb-2 text-gray-900 mt-10">Your QR Code</h1>
      <br />
      <br />
      <br />
      <p className="text-md mb-2 text-gray-700">Order ID: {orderId}</p>
      <br />
      <canvas className="ml-20 mt-20" ref={canvasRef} />
    </div>
  </div>
</div>

</>

  
   
  );
};

export default QRPage;
