import React, { useState, useEffect } from 'react';
import ApiKeyPrompt from './components/ApiKeyPrompt';
import RegisterClient from './components/RegisterClient';
import SearchClients from './components/SearchClients';
import ViewClientProfile from './components/ViewClientProfile';
import CreateProgram from './components/CreateProgram';
import EnrollClient from './components/EnrollClient';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('API_KEY');
    if (stored) {
      setApiKey(stored);
      setHasKey(true);
    }
  }, []);

  function handleApiKeySave(key) {
    localStorage.setItem('API_KEY', key);
    setApiKey(key);
    setHasKey(true);
  }

  function handleClearKey() {
    localStorage.removeItem('API_KEY');
    setApiKey('');
    setHasKey(false);
  }

  async function callApi(path, method = 'GET', body = null) {
    const opts = { method, headers: { 'API-KEY': apiKey } };
    if (body) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
    const res = await fetch(`http://localhost:5000/api${path}`, opts);
    const text = await res.text();
    try { return JSON.parse(text); } catch { return text; }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 font-sans">
      <h1 className="text-2xl mb-4">Doctor Portal</h1>

      {!hasKey ? (
        <ApiKeyPrompt onSave={handleApiKeySave} />
      ) : (
        <>
          <p className="mb-4 text-green-700">API Key saved. You can now access features.</p>
          <button onClick={handleClearKey} className="mb-6 bg-red-600 text-white px-3 py-1 rounded">Change API Key</button>

          <RegisterClient callApi={callApi} />
          <SearchClients callApi={callApi} />
          <ViewClientProfile callApi={callApi} />
          <CreateProgram callApi={callApi} />
          <EnrollClient callApi={callApi} />
        </>
      )}
    </div>
  );
}
