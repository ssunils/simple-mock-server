import JSONEditor from "@/components/custom/CodeEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";
import { ApiErrorMesage } from "@/types/AxiosErrorMessage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useState } from "react";


/**
 * @description refetchList
 * */
type ApiCreateFormProps = {
  refetchList: () => void;
}

export default function ApiCreateForm(props: ApiCreateFormProps) {

  const [method, setMethod] = useState<string>('GET');
  const [path, setPath] = useState<string>('');
  const [response, setResponse] = useState<string>('{}');
  const [error, setError] = useState<string>('');


  const addRoute = async (e: FormEvent) => {
    e.preventDefault();
    return axios.post('/api/add-route', JSON.stringify({ method, path, response: response }));
  };

  const addRouteQuery = useMutation({
    mutationFn: addRoute,
    onError: (error: ApiErrorMesage) => {
      console.log("Error occurred:", error.response?.data?.message);
    },
    onSuccess: async () => {
      props.refetchList();
    }
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      JSON.parse(response);
    } catch {
      setError('Invalid JSON format.');
      return;
    }
    addRouteQuery.mutate(e);
  };

  return (
    <>
      {addRouteQuery.isError && (
        <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 mb-4" role="alert">
          <p>{addRouteQuery.error.response?.data?.message || 'Unable to create API'}</p>
        </div>
      )}
      {addRouteQuery.isSuccess && (
        <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 mb-4" role="alert">
          <p>Route created successfully</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className=" rounded-md px-8 pt-6 pb-8 mb-6 w-full bg-card">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
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
          <label className="block text-sm font-bold mb-2">
            Path:
          </label>
          <Input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            required
            placeholder="/example"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">
            Response:
          </label>
          <JSONEditor onChange={setResponse} value={response} />
        </div>
        <div className="text-right">
          <div>
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          </div>
          <Button
            type="submit"
            disabled={addRouteQuery.isPending}
            variant="default"
            size="default"
          >
            Add Route
          </Button>
        </div>
      </form>
    </>
  )
}