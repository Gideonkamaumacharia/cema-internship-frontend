
import React, { useState, useEffect } from 'react';
import ApiKeyPrompt from './components/ApiKeyPrompt';
import RegisterClient from './components/RegisterClient';
import SearchClients from './components/SearchClients';
import ViewClientProfile from './components/ViewClientProfile';
import CreateProgram from './components/CreateProgram';
import EnrollClient from './components/EnrollClient';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [hasKey, setHasKey] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('API_KEY');
    if (stored) {
      setApiKey(stored);
      // immediately validate stored key and fetch doctor info
      fetch('/api/auth/validate', { headers: { 'API-KEY': stored } })
        .then(r => r.json())
        .then(data => {
          if (data.doctor) {
            setCurrentDoctor(data.doctor);
            setHasKey(true);
          }
        });
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
    <div className="max-w-2xl mx-auto p-4 font-sans">
      <h1 className="text-2xl mb-4">Doctor Portal</h1>

      {!hasKey ? (
        <ApiKeyPrompt onSave={handleApiKeySave} />
      ) : (
        <>
          <p className="mb-4 text-green-700">Welcome, Dr. {currentDoctor.name}!</p>
          <button onClick={handleClearKey} className="mb-6 bg-red-600 text-white px-3 py-1 rounded">Change API Key</button>

          {/* Core functionality */}
          <RegisterClient callApi={callApi} />
          <SearchClients callApi={callApi} />
          <ViewClientProfile callApi={callApi} />
          <CreateProgram callApi={callApi} />
          <EnrollClient callApi={callApi} />

          {/* Admin features */}
          {currentDoctor.is_admin && <AdminPanel callApi={callApi} />}             
        </>
      )}
    </div>
  );
}