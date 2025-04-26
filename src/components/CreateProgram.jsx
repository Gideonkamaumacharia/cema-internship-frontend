import React, { useState } from 'react';

export default function CreateProgram({ callApi }) {
  const [program, setProgram] = useState({ name: '', description: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    const res = await callApi('/programs/create', 'POST', program);
    setResult(res);
    setProgram({ name: '', description: '' });
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Health Program</h2>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          placeholder="Program Name"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={program.name}
          onChange={e => setProgram({ ...program, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          value={program.description}
          onChange={e => setProgram({ ...program, description: e.target.value })}
        />
      </div>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
      >
        {loading ? 'Creating...' : 'Create Program'}
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md overflow-auto">
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
