import React, { useState } from 'react';
export default function EnrollClient({ callApi }) {
  const [clientId, setClientId] = useState('');
  const [ids, setIds] = useState('');
  const [result, setResult] = useState(null);
  const handleEnroll = async () => {
    const program_ids = ids.split(',').map(s=>parseInt(s.trim())).filter(n=>!isNaN(n));
    const res = await callApi(`/enrollments/${clientId}`, 'POST', { program_ids });
    setResult(res);
    setClientId(''); setIds('');
  };
  return (
    <fieldset className="mb-6 p-4 border rounded">
      <legend className="font-semibold">Enroll Client</legend>
      <input type="number" placeholder="Client ID" className="border p-1 w-full mb-1" value={clientId} onChange={e=>setClientId(e.target.value)} />
      <input placeholder="Program IDs (comma-separated)" className="border p-1 w-full mb-2" value={ids} onChange={e=>setIds(e.target.value)} />
      <button onClick={handleEnroll} className="bg-blue-600 text-white px-3 py-1 rounded">Enroll</button>
      {result && <pre className="mt-2 bg-gray-100 p-2 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>}
    </fieldset>
  )
}