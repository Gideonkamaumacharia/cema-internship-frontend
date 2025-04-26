import React, { useState } from 'react';

export default function SearchClients({ callApi }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    const res = await callApi(`/clients/search?q=${encodeURIComponent(q)}`, 'GET');
    setResults(res);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Search Clients</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter first or last name"
          className="flex-grow border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Search
        </button>
      </div>

      {results && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md overflow-auto">
          {results.length > 0 ? (
            <ul className="space-y-2">
              {results.map(client => (
                <li key={client.id} className="p-2 bg-white rounded-md shadow-sm">
                  {client.first_name} {client.last_name} (ID: {client.id})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No clients found.</p>
          )}
        </div>
      )}
    </div>
  );
}
