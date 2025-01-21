import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useState } from "react";

export default function ApiCreateForm() {

  const [method, setMethod] = useState<string>('GET');
  const [path, setPath] = useState<string>('');
  const [response, setResponse] = useState<string>('{}');


  const addRoute = async (e: FormEvent) => {
    e.preventDefault();
    return axios.post('/api/add-route', JSON.stringify({ method, path, response: response }));
  };

  const addRouteQuery = useMutation({ mutationFn: addRoute });



  return (
    <>
      {addRouteQuery.isError && (
        <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mb-4" role="alert">
          <p>{addRouteQuery.error.message}</p>
        </div>
      )}
      {addRouteQuery.isSuccess && (
        <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md mb-4" role="alert">
          <p>Route created successfully</p>
        </div>
      )}
      <form onSubmit={addRouteQuery.mutate} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Method:
          </label>
          <Select onValueChange={(value) => setMethod(value)} defaultValue={method}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
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
            disabled={addRouteQuery.isPending}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">
            Add Route
          </button>
        </div>
      </form>
    </>
  )
}