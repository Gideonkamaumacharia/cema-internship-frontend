import React, { useState } from 'react';

export default function ApiKeyPrompt({ onSave }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    const trimmed = key.trim();
    if (!trimmed) {
      setError('Please enter your API key');
      return;
    }

    // Validate key with backend
    try {
      const res = await fetch('http://localhost:5000/api/auth/validate', {
        method: 'GET',
        headers: { 'API-KEY': trimmed }
      });

      if (res.status !== 200) {
        setError('Invalid API key. Please check and try again.');
        return;
      }

      // Key is valid
      setError('');
      localStorage.setItem('API_KEY', trimmed);
      onSave(trimmed);
    } catch (err) {
      setError('Network error: could not validate API key');
    }
  }

  return (
    <div className="p-4 border rounded">
      <label className="block mb-1">Enter API Key:</label>
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Paste your API key"
        value={key}
        onChange={e => setKey(e.target.value)}
      />
      {error && <p className="text-red-600 mt-1">{error}</p>}
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
      >
        Save & Continue
      </button>
    </div>
  );
}