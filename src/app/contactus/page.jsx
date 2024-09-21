import React from 'react';

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-5xl font-bold mb-6 animate-bounce text-purple-500">Get in Touch!</h1>
      <p className="text-lg mb-8 text-center max-w-xl text-gray-300">
        We’d love to hear from you! Whether you have a question, feedback, or just want to say hi, fill out the form below.
      </p>
      <form className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md space-y-4">
        <div>
          <label className="block text-gray-300 font-semibold mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="border border-gray-600 rounded-lg p-2 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 font-semibold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border border-gray-600 rounded-lg p-2 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 font-semibold mb-2" htmlFor="message">Message</label>
          <textarea
            id="message"
            className="border border-gray-600 rounded-lg p-2 w-full h-32 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your Message"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 rounded-lg transition duration-200"
        >
          Send Message
        </button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-lg text-gray-300">Or reach us at:</p>
        <p className="text-md mt-2">📧 parkit@gmail.com</p>
        <p className="text-md">📞 87625-12340</p>
      </div>
    </div>
  );
};

export default ContactUs;
