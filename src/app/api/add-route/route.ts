import fs from 'fs-extra';
import path from 'path';

/**
 * Interface representing the structure of a request for adding a new route.
 */
interface AddRouteRequest extends Request {
  /**
   * The path where the route should be added. Must start with '/'.
   */
  path: string;

  /**
   * The JSON response data for the route, as a string.
   */
  response: string;

  /**
   * The HTTP method for the route (e.g., GET, POST, PUT, DELETE).
   */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

/**
 * The directory where mock routes are stored.
 */
const mockRoutesDir = path.resolve(process.cwd(), 'mock-routes');

// Ensure the mock-routes directory exists
if (!fs.existsSync(mockRoutesDir)) {
  fs.mkdirSync(mockRoutesDir);
}

/**
 * Handles the creation of a new mock route.
 *
 * @param {AddRouteRequest} req - The request containing the route information.
 * @returns {Response} - A response indicating success or failure of the operation.
 */

export async function POST(req: AddRouteRequest) {
  const data = await req.json();

  // Validate the route path
  if (!data.path || typeof data.path !== 'string' || !data.path.startsWith('/')) {
    return Response.json(
      { message: 'Path must start with "/"' },
      { status: 400 }
    );
  }

  const fileName = `${data.method}.json`;
  const fullPath = path.join(mockRoutesDir, data.path, fileName);

  // Check if the file for the specified method already exists
  if (fs.existsSync(fullPath)) {
    return Response.json(
      { message: `The method "${data.method}" already exists for this path.` },
      { status: 400 }
    );
  } else {
    // Create a new file for the route if it doesn't exist
    let routeData;
    try {
      routeData = JSON.parse(data.response);
    } catch (err) {
      console.log(err);
      return Response.json(
        { message: "Invalid JSON response" },
        { status: 400 }
      );
    }

    // Ensure the directory structure exists
    await fs.ensureDir(path.join(mockRoutesDir, data.path));

    // Write the route data to the file
    await fs.writeJson(fullPath, routeData, { spaces: 2 });
  }

  return Response.json({ success: true }, { status: 200 });
}
