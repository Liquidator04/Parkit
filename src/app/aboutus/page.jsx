import React from 'react';

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      <h1 className="text-5xl font-bold mb-6 animate-bounce text-purple-500">About Us</h1>
      <p className="max-w-2xl text-center text-lg md:text-xl mb-8 text-gray-300">
        Parkit is a web application designed to solve urban parking issues by connecting users with available parking spaces provided by establishments like malls or apartments. Users can search for nearby spots, book them based on real-time availability, and manage payments through a QR code system. The platform supports time-based parking, secure payments via Razorpay, and integrates NextAuth for authentication.
      </p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl">
        <h2 className="text-2xl font-semibold mb-2 text-purple-500">Our Mission</h2>
        <p className="text-neutral-400">
          Connect users, optimize urban parking, simplify parking management, and enhance user experiences.
        </p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl mt-4">
        <h2 className="text-2xl font-semibold mb-2 text-purple-500">Our Values</h2>
        <ul className="list-disc list-inside text-neutral-400">
          <li>Efficiency</li>
          <li>Innovation</li>
          <li>Convenience</li>
          <li>Sustainability</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
