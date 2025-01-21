import fs from 'fs';
import path from 'path';

interface AddRouteRequest extends Request {
  path: string;
  response: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

interface AddRouteResponse {
  response: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

interface MockData {
  path: string;
  data: AddRouteResponse[];
}

const mockRoutesDir = path.resolve(process.cwd(), 'mock-routes');

// Ensure the mock-routes directory exists
if (!fs.existsSync(mockRoutesDir)) {
  fs.mkdirSync(mockRoutesDir);
}

export async function POST(req: AddRouteRequest) {
  const data = await req.json();

  if (!data.path || typeof data.path !== 'string' || !data.path.startsWith('/')) {
    return Response.json(
      { error: 'Path must be a valid string starting with "/"' },
      { status: 400 }
    );
  }

  const fileName = `${data.path.replace(/\//g, '_')}.json`;
  const filePath = path.join(mockRoutesDir, fileName);
  const routeData: MockData = { path: data.path, data: [{ method: data.method, response: data.response }] };

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Read existing file data
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const filteredData = existingData.data.find((item: AddRouteResponse) => item.method === data.method);
    // Check if the method already exists in the file
    if (filteredData && filteredData.method === data.method) {
      return Response.json(
        { error: `The method "${data.method}" already exists for this path.` },
        { status: 400 }
      );
    }

    // Update the file with the new method and response
    existingData.data.push({ method: data.method, response: data.response });
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
  } else {
    // Create a new file if it doesn't exist
    console.log(routeData);
    fs.writeFileSync(filePath, JSON.stringify(routeData, null, 2));
  }

  return Response.json({ success: true }, { status: 200 });
}
