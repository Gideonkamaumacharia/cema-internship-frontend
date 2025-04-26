import React, { useState } from 'react';
export default function CreateProgram({ callApi }) {
  const [program, setProgram] = useState({ name: '', description: '' });
  const [result, setResult] = useState(null);
  const handleCreate = async () => {
    const res = await callApi('/programs/', 'POST', program);
    setResult(res);
    setProgram({ name: '', description: '' });
  };
  return (
    <fieldset className="mb-6 p-4 border rounded">
      <legend className="font-semibold">Create Program</legend>
      <input placeholder="Program Name" className="border p-1 w-full mb-1" value={program.name} onChange={e=>setProgram({...program, name: e.target.value})} />
      <textarea placeholder="Description" className="border p-1 w-full mb-2" value={program.description} onChange={e=>setProgram({...program, description: e.target.value})} />
      <button onClick={handleCreate} className="bg-blue-600 text-white px-3 py-1 rounded">Create</button>
      {result && <pre className="mt-2 bg-gray-100 p-2 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>}
    </fieldset>
  )
}
