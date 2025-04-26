import React, { useState } from 'react';
export default function ViewClientProfile({ callApi }) {
  const [id, setId] = useState('');
  const [profile, setProfile] = useState(null);
  const handleView = async () => {
    const res = await callApi(`/clients/${id}`, 'GET');
    setProfile(res);
  };
  return (
    <fieldset className="mb-6 p-4 border rounded">
      <legend className="font-semibold">View Client Profile</legend>
      <input type="number" placeholder="Client ID" className="border p-1 w-full mb-2" value={id} onChange={e=>setId(e.target.value)} />
      <button onClick={handleView} className="bg-blue-600 text-white px-3 py-1 rounded">View</button>
      {profile && <pre className="mt-2 bg-gray-100 p-2 whitespace-pre-wrap">{JSON.stringify(profile, null, 2)}</pre>}
    </fieldset>
  );
}