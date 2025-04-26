// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ApiKeyPrompt from './components/ApiKeyPrompt';
import RegisterClient from './components/RegisterClient';
import SearchClients from './components/SearchClients';
import ViewClientProfile from './components/ViewClientProfile';
import CreateProgram from './components/CreateProgram';
import EnrollClient from './components/EnrollClient';
import AdminPanel from './components/AdminPanel';

// Layout for protected portal routes
function PortalLayout({ currentDoctor, handleClearKey }) {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Doctor Portal</h1>
        <button onClick={handleClearKey} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
          Change API Key
        </button>
      </header>

      <p className="mb-6 text-lg text-green-700">Welcome, Dr. {currentDoctor.name}!</p>

      <nav className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <Link to="register" className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg text-center">Register Client</Link>
        <Link to="search" className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg text-center">Search Clients</Link>
        <Link to="profile" className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg text-center">View Profile</Link>
        <Link to="programs" className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg text-center">Create Program</Link>
        <Link to="enroll" className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg text-center">Enroll Client</Link>
        {currentDoctor.is_admin && <Link to="admin" className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg text-center">Admin Panel</Link>}
      </nav>

      <Outlet />
    </div>
  );
}

function Protected({ hasKey, children }) {
  if (!hasKey) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [hasKey, setHasKey] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [verifying, setVerifying] = useState(false);

  
  useEffect(() => {
    const stored = localStorage.getItem('API_KEY');
    if (stored) {
      setApiKey(stored);
      setVerifying(true);
      fetch('/api/auth/validate', { headers: { 'API-KEY': stored } })
        .then(r => r.json())
        .then(data => {
          if (data.doctor) {
            setCurrentDoctor(data.doctor);
            setHasKey(true);
          }
        })
        .finally(() => setVerifying(false));
    }
  }, []);

  function handleApiKeySave(key, doctor) {
    localStorage.setItem('API_KEY', key);
    setApiKey(key);
    setCurrentDoctor(doctor);
    setHasKey(true);
  }

  function handleClearKey() {
    localStorage.removeItem('API_KEY');
    setApiKey('');
    setCurrentDoctor(null);
    setHasKey(false);
  }

  async function callApi(path, method = 'GET', body = null) {
    const opts = { method, headers: { 'API-KEY': apiKey } };
    if (body) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
    const res = await fetch(`/api${path}`, opts);
    return res.json();
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            hasKey ? <Navigate to="/portal/register" replace /> : <ApiKeyPrompt onSave={handleApiKeySave} />
          }
        />
        <Route
          path="/portal"
          element={
            <Protected hasKey={hasKey}>
              {verifying || !currentDoctor ? (
                <div className="p-4 text-center">Verifying your API Key...</div>
              ) : (
                <PortalLayout currentDoctor={currentDoctor} handleClearKey={handleClearKey} />
              )}
            </Protected>
          }
        >
          <Route path="register" element={<RegisterClient callApi={callApi} />} />
          <Route path="search" element={<SearchClients callApi={callApi} />} />
          <Route path="profile" element={<ViewClientProfile callApi={callApi} />} />
          <Route path="programs" element={<CreateProgram callApi={callApi} />} />
          <Route path="enroll" element={<EnrollClient callApi={callApi} />} />
          <Route path="admin" element={<AdminPanel callApi={callApi} />} />
          <Route path="*" element={<Navigate to="register" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
