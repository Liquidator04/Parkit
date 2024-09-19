"use client";
import React, { useState } from "react";
import Script from "next/script";

const PaymentPage = () => {
  const [hours, setHours] = useState(1); // Default to 1 hour
  const [isProcessing, setIsProcessing] = useState(false);

  const RATE_PER_HOUR = 10;
  const AMOUNT = hours * RATE_PER_HOUR; // Calculate amount based on hours

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hours }),
      });
      const data = await response.json();

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: AMOUNT * 10, // Amount in paise
        currency: "INR",
        name: "Parkit",
        description: "Parking payment",
        order_id: data.orderId, // Order ID from the backend
        handler: function (response) {
          console.log("Payment Successful", response);
         
        },
        prefill: {
          name: "John Doe",
          email: "johndev@something.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpl = new window.Razorpay(options);
      rzpl.open();
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Complete Your Payment</h1>
      <p className="text-xl mb-6 text-gray-700">Amount: ₹{AMOUNT}</p>

      <div className="mb-4">
        <label htmlFor="hours" className="block text-gray-700 font-semibold mb-2">Number of Hours:</label>
        <input
          type="number"
          id="hours"
          value={hours}
          onChange={(e) => setHours(Math.max(1, parseInt(e.target.value, 10)))}
          min="1"
          className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`px-6 py-3 rounded-lg font-semibold text-white ${
          isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        } transition-colors duration-300`}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>

      {/* Razorpay script to load the payment SDK */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
};

export default PaymentPage;
