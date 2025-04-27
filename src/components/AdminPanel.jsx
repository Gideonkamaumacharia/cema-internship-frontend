import React, { useState } from 'react';

export default function AdminPanel({ callApi }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    const res = await callApi('/admin/doctors', 'POST', form);
    if (res && res.message) {
      alert(res.message);
    }
    setResult(res);
    setForm({ name: '', email: '' });
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Panel: Create New Doctor</h2>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
      >
        {loading ? 'Creating...' : 'Create & Email Key'}
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md overflow-auto">
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
