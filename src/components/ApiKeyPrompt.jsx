import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ApiKeyPrompt({ onSave }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    const trimmed = key.trim();
    if (!trimmed) {
      setError('Please enter your API key');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Validate against backend
      const res = await fetch('https://cema-internship-project.onrender.com/api/auth/validate', {
        method: 'GET',
        headers: { 'API-KEY': trimmed }
      });
      const data = await res.json();
      if (res.ok && data.doctor) {
        // Update App state and go to portal immediately
        onSave(trimmed, data.doctor);
        navigate('/portal');
      } else {
        setError(data.msg || 'Invalid API key. Please try again.');
      }
    } catch {
      setError('Network error: could not validate API key');
    } finally {
      setLoading(false);
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
      {loading && <p className="mt-2">Verifying…</p>}
      {error && <p className="text-red-600 mt-1">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
      >
        {loading ? 'Verifying…' : 'Save & Continue'}
      </button>
    </div>
  );
}
