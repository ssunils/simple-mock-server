import fs from 'fs';
import path from 'path';

const mockRoutesDir = path.resolve(process.cwd(), 'mock-routes');

export async function GET(req: Request) {
    const url = new URL(req.url); // Parse the URL to access query params and path
    const { path, method } = Object.fromEntries(url.searchParams); // Get query parameters as an object
    console.log(mockRoutesDir + path + method + '.json');
    const routeFiles = await fs.readFileSync(mockRoutesDir + path + '/' + method + '.json', 'utf8'); // Read the directory for the specified path
    return Response.json(JSON.parse(routeFiles), { status: 200 });
}