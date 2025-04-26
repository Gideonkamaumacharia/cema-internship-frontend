import React, { useState, useEffect } from 'react';

export default function EnrollClient({ callApi }) {
  const [clientId, setClientId] = useState('');
  const [programs, setPrograms] = useState([]);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function loadPrograms() {
      const data = await callApi('/programs/list', 'GET');
      setPrograms(data);
    }
    loadPrograms();
  }, [callApi]);

  const handleEnroll = async () => {
    setLoading(true);
    const res = await callApi(`/enrollments/${clientId}`, 'POST', { program_ids: selected });
    setResult(res);
    setClientId('');
    setSelected([]);
    setLoading(false);
  };

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Enroll Client</h2>

      <div className="flex flex-col gap-4 mb-4">
        <input
          type="number"
          placeholder="Client ID"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={clientId}
          onChange={e => setClientId(e.target.value)}
        />

        <div className="space-y-2">
          <p className="font-medium">Select Programs:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-auto">
            {programs.map(prog => (
              <label key={prog.id} className="flex items-center p-2 border rounded-md hover:bg-blue-50">
                <input
                  type="checkbox"
                  checked={selected.includes(prog.id)}
                  onChange={() => toggleSelect(prog.id)}
                  className="mr-2 h-4 w-4 text-blue-600"
                />
                <span>{prog.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleEnroll}
        disabled={loading || !clientId || selected.length === 0}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
      >
        {loading ? 'Enrolling...' : 'Enroll'}
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md overflow-auto">
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
