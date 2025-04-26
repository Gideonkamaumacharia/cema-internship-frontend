import React, { useState } from 'react';
export default function RegisterClient({ callApi }) {
  const [data, setData] = useState({ first_name: '', last_name: '', date_of_birth: '', gender: 'Male', contact_info: '' });
  const [result, setResult] = useState(null);
  //const baseURL= "http://127.0.0.1:5000"
  const handleSubmit = async () => {
    const res = await callApi('/clients/register', 'POST', data);
    setResult(res);
    setData({ first_name: '', last_name: '', date_of_birth: '', gender: 'Male', contact_info: '' });
  };
  return (
    <fieldset className="mb-6 p-4 border rounded">
      <legend className="font-semibold">Register Client</legend>
      <input placeholder="First Name" className="border p-1 w-full mb-1" value={data.first_name} onChange={e=>setData({...data, first_name: e.target.value})} />
      <input placeholder="Last Name" className="border p-1 w-full mb-1" value={data.last_name} onChange={e=>setData({...data, last_name: e.target.value})} />
      <input type="date" className="border p-1 w-full mb-1" value={data.date_of_birth} onChange={e=>setData({...data, date_of_birth: e.target.value})} />
      <select className="border p-1 w-full mb-1" value={data.gender} onChange={e=>setData({...data, gender: e.target.value})}>
        <option>Male</option><option>Female</option><option>Other</option>
      </select>
      <input placeholder="Contact Info" className="border p-1 w-full mb-2" value={data.contact_info} onChange={e=>setData({...data, contact_info: e.target.value})} />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-3 py-1 rounded">Submit</button>
      {result && <pre className="mt-2 bg-gray-100 p-2 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>}
    </fieldset>
  );
}