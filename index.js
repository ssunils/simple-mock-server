const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Directory to store mock routes
const routesDir = path.join(__dirname, 'mock-routes');
if (!fs.existsSync(routesDir)) {
  fs.mkdirSync(routesDir);
}

// Helper: Load all routes from files
const loadRoutes = () => {
  const routes = {};
  const files = fs.readdirSync(routesDir);
  files.forEach((file) => {
    const filePath = path.join(routesDir, file);
    if (fs.existsSync(filePath) && file.endsWith('.json')) {
      const routeData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      routes[routeData.path] = routeData;
    }
  });
  return routes;
};

// Load routes initially
let mockRoutes = loadRoutes();

// UI Route
app.get('/', (req, res) => {
  res.render('index', { routes: mockRoutes });
});

// Add or Update a Mock Route
app.post('/add-route', (req, res) => {
  const { method, path: routePath, response } = req.body;
  if (!routePath.startsWith('/')) {
    return res.status(400).json({ error: 'Path must start with "/"' });
  }

  const routeData = { method, path: routePath, response };
  const fileName = `${routePath.replace(/\//g, '_')}.json`; // Replace "/" with "_" for file naming
  const filePath = path.join(routesDir, fileName);

  fs.writeFileSync(filePath, JSON.stringify(routeData, null, 2));
  mockRoutes = loadRoutes(); // Reload routes

  res.json({ success: true, message: `Route ${method} ${routePath} added.` });
});

// Handle Mock Routes
app.all('*', (req, res) => {
  const route = mockRoutes[req.path];
  if (route && route.method === req.method) {
    res.json(route.response);
  } else {
    res.status(404).json({ error: 'Route not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
