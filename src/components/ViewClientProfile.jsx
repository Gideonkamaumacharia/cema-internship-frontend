import React, { useState } from 'react';

export default function ViewClientProfile({ callApi }) {
  const [id, setId] = useState('');
  const [profile, setProfile] = useState(null);

  const handleView = async () => {
    const res = await callApi(`/clients/${id}`, 'GET');
    setProfile(res);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">View Client Profile</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Client ID"
          className="flex-grow border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={id}
          onChange={e => setId(e.target.value)}
        />
        <button
          onClick={handleView}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          View
        </button>
      </div>

      {profile && (
        <div className="bg-gray-50 p-4 rounded-md">
          <p><span className="font-semibold">Name:</span> {profile.client.first_name} {profile.client.last_name}</p>
          <p><span className="font-semibold">DOB:</span> {profile.client.date_of_birth}</p>
          <p><span className="font-semibold">Gender:</span> {profile.client.gender}</p>
          <p><span className="font-semibold">Contact:</span> {profile.client.contact_info}</p>
          <p><span className="font-semibold">Registered:</span> {new Date(profile.client.registered_at).toLocaleString()}</p>

          <h3 className="mt-4 text-xl font-semibold">Enrolled Programs:</h3>
          {profile.programs.length > 0 ? (
            <ul className="list-disc list-inside">
              {profile.programs.map(p => (
                <li key={p.id} className="mt-1">
                  {p.name} — <em>{new Date(p.enrolled_at).toLocaleDateString()}</em> ({p.status})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No program enrollments found.</p>
          )}
        </div>
      )}
    </div>
  )
}
