import React, { useState } from 'react';

export default function AdminPanel({ callApi }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [result, setResult] = useState(null);

  const handleCreate = async () => {
    const res = await callApi('/admin/doctors', 'POST', form);
    setResult(res);
    setForm({ name: '', email: '' });
  };

  return (
    <fieldset className="mb-6 p-4 border-2 border-dashed rounded">
      <legend className="font-bold text-lg">Admin Panel</legend>
      <h3 className="font-semibold mb-2">Create New Doctor</h3>
      <input
        placeholder="Name"
        className="border p-1 w-full mb-1"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        className="border p-1 w-full mb-2"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <button onClick={handleCreate} className="bg-purple-600 text-white px-3 py-1 rounded">
        Create & Email Key
      </button>
      {result && <pre className="mt-2 bg-gray-100 p-2 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>}
    </fieldset>
  );
}
