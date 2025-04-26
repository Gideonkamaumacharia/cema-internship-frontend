import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-lg">
        <h1 className="text-4xl font-extrabold mb-4 text-indigo-600">CEMA Health Info System</h1>
        <p className="mb-6 text-gray-700">Securely manage clients and health programs.</p>
        <Link
          to="/login"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}