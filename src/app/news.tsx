"use client"
import { useState, FormEvent } from 'react';

type Route = {
  method: string;
  path: string;
};

export default function Home() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [method, setMethod] = useState<string>('GET');
  const [path, setPath] = useState<string>('');
  const [response, setResponse] = useState<string>('{}');

  const fetchRoutes = async () => {
    const res = await fetch('/api/mock');
    const data = await res.json();
    setRoutes(data);
  };

  const addRoute = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/add-route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method, path, response: JSON.parse(response) }),
    });
    const result = await res.json();
    alert(result.message);
    fetchRoutes();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">News Server UI</h1>
      <form onSubmit={addRoute} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Method:
          </label>
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Path:
          </label>
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            required
            placeholder="/example"
            className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Response:
          </label>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            required
            placeholder='{"key": "value"}'
            className="block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">
            Add Route
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Routes:</h2>
      <ul className="bg-white shadow-md rounded w-full max-w-lg p-4">
        {routes.map((route, index) => (
          <li key={index} className="border-b last:border-b-0 py-2">
            <span className="font-bold text-gray-700">{route.method}</span>{' '}
            <span className="text-gray-600">{route.path}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
