import fs from 'fs';
import path from 'path';

interface AddRouteRequest extends Request {
  path: string;
  response: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

const mockRoutesDir = path.resolve(process.cwd(), 'mock-routes');

if (!fs.existsSync(mockRoutesDir)) {
  fs.mkdirSync(mockRoutesDir);
}

export async function POST(req: AddRouteRequest) {
  // const { path } = req.text();
  const data = await req.json()
  console.log(data.path)
  if (!data.path || typeof data.path !== 'string' || !data.path.startsWith('/')) {
    return Response.json({ error: 'Path must be a valid string starting with "/"' }, { status: 400 });
  }

  const routeData = { method: data.method, path: data.path, response: data.response };
  // This has an issue when the filename has _ in it
  // need to replace it with something unique
  const fileName = `${data.path.replace(/\//g, '_')}.json`;
  console.log(fileName)
  const filePath = path.join(mockRoutesDir, fileName);

  fs.writeFileSync(filePath, JSON.stringify(routeData, null, 2));
  return Response.json({ success: true }, { status: 200 });
}
