import fs from 'fs';
import path from 'path';

const mockRoutesDir = path.resolve(process.cwd(), 'mock-routes');

export async function GET(req: Request) {
  const routeFiles = await fs.readdirSync(mockRoutesDir);

  console.log('MOCK', routeFiles)

  const routeDate = [];

  for (const file of routeFiles) {
    const filePath = path.join(mockRoutesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log(fileContent)
    const routeData = JSON.parse(fileContent);
    console.log(routeData)

    if (routeData.path === req.url && routeData.method === req.method) {
        return Response.json(routeData.response);
    } else {
      routeDate.push(routeData)
    }
  }

  return Response.json(routeDate, { status: 200})
}