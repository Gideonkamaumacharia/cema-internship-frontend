import React, { useState } from 'react';
export default function SearchClients({ callApi }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState(null);
  const handleSearch = async () => {
    const res = await callApi(`/clients/search?q=${encodeURIComponent(q)}`, 'GET');
    setResults(res);
  };
  return (
    <fieldset className="mb-6 p-4 border rounded">
      <legend className="font-semibold">Search Clients</legend>
      <input placeholder="Enter name..." className="border p-1 w-full mb-2" value={q} onChange={e=>setQ(e.target.value)} />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-3 py-1 rounded">Search</button>
      {results && <pre className="mt-2 bg-gray-100 p-2 whitespace-pre-wrap">{JSON.stringify(results, null, 2)}</pre>}
    </fieldset>
  );
}