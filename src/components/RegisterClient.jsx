import React, { useState } from 'react';

export default function RegisterClient({ callApi }) {
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: 'Male',
    contact_info: ''
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await callApi('/clients/register', 'POST', data);
    setResult(res);
    setData({ first_name: '', last_name: '', date_of_birth: '', gender: 'Male', contact_info: '' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register a New Client</h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={data.first_name}
          onChange={e => setData({ ...data, first_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={data.last_name}
          onChange={e => setData({ ...data, last_name: e.target.value })}
        />
        <input
          type="date"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={data.date_of_birth}
          onChange={e => setData({ ...data, date_of_birth: e.target.value })}
        />
        <select
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={data.gender}
          onChange={e => setData({ ...data, gender: e.target.value })}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          type="text"
          placeholder="Contact Info"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={data.contact_info}
          onChange={e => setData({ ...data, contact_info: e.target.value })}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
      >
        Submit
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
