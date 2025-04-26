import React, { useState } from 'react';

export default function ApiKeyPrompt({ onSave }) {
  const [key, setKey] = useState('');

  const handleSubmit = () => {
    if (!key.trim()) {
      alert('Please enter your API key');
      return;
    }
    onSave(key.trim());
  };

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
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
      >
        Save & Continue
      </button>
    </div>
  );
}
