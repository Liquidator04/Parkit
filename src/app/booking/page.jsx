"use client";

import { useState } from 'react';
import QRCode from 'qrcode-generator';
import { CardDemo } from '@/components/blocks/cards-demo-1';

const BookParking = () => {
  const [isBooked, setIsBooked] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [qrCode, setQrCode] = useState('');
  const [counter, setCounter] = useState(5); // Initial number of available bookings
  const [bookingId, setBookingId] = useState(null); // Store the generated booking ID
  const [inputBookingId, setInputBookingId] = useState(''); // Store the input booking ID

  const handleBook = () => {
    if (counter > 0) {
      const newBookingId = Date.now(); // Generate a unique booking ID
      const data = { bookingId: newBookingId, status: 'booked' };
      setBookingData(data);
      setBookingId(newBookingId); // Store the booking ID

      const qr = QRCode(0, 'L');
      qr.addData(JSON.stringify(data)); // QR contains booking info
      qr.make();
      setQrCode(qr.createImgTag(4));
      setIsBooked(true);
      setInputBookingId(''); // Reset input
    } else {
      alert('No available bookings left!');
    }
  };

  const handleScan = () => {
    if (isBooked) {
      if (inputBookingId) {
        const parsedBookingId = parseInt(inputBookingId, 10);
        if (parsedBookingId === bookingId) { // Check if input ID matches the generated ID
          setCounter(counter - 1); // Decrement the counter
          alert(`QR Code scanned successfully! Remaining bookings: ${counter - 1}`);
          // Reset booking status and QR code
          setIsBooked(false);
          setQrCode('');
          setBookingData(null);
          setBookingId(null); // Clear the stored booking ID
          setInputBookingId(''); // Clear input field
        } else {
          alert('Scanned ID does not match the booking!');
        }
      } else {
        alert('Please enter a booking ID!');
      }
    } else {
      alert('No booking found to scan!');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Book Your Parking Spot</h1>
      <CardDemo onBook={handleBook} />
      {isBooked && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '18px' }}>Booking Successful!</p>
          <h2>Your Booking QR Code</h2>
          <div dangerouslySetInnerHTML={{ __html: qrCode }} />
          <input
            type="text"
            value={inputBookingId}
            onChange={(e) => setInputBookingId(e.target.value)}
            placeholder="Enter Booking ID"
            style={{ marginTop: '10px', padding: '8px', width: '200px' }}
          />
          <button onClick={handleScan} style={{ marginTop: '10px' }}>
            Submit Scanned Booking ID
          </button>
        </div>
      )}
      <p>Remaining Bookings: {counter}</p> {/* Display remaining bookings */}
    </div>
  );
};

export default BookParking;
