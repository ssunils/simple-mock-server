import fs from 'fs-extra';
import path from 'path';

interface ApiRoute {
  path: string;
  method: string;
}

const mockRoutesDir = path.resolve(process.cwd(), 'mock-routes');

export async function GET() {
  const apiList = await listApiRoutes();
  console.log('Available APIs:', apiList);
  return Response.json(apiList, { status: 200 })
}


export async function listApiRoutes(): Promise<ApiRoute[]> {
  const apiRoutes: ApiRoute[] = [];

  // Helper function to recursively read directories
  async function readDirRecursive(currentPath: string, relativePath = '') {
    const items = await fs.readdir(currentPath);

    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const itemRelativePath = path.join(relativePath, item);
      const stat = await fs.stat(itemPath);
      console.log("stat", stat)
      if (stat.isDirectory()) {
        // Recursively process subdirectories
        await readDirRecursive(itemPath, itemRelativePath);
      } else if (stat.isFile() && item.endsWith('.json')) {
        // Extract the HTTP method from the filename (e.g., GET.json)
        const method = path.basename(item, '.json').toUpperCase();

        // Add the API route to the list
        apiRoutes.push({
          path: `/${relativePath.replace(/\\/g, '/')}`, // Normalize to forward slashes
          method,
        });
      }
    }
  }

  // Start the recursive directory traversal
  await readDirRecursive(mockRoutesDir);

  return apiRoutes;
}