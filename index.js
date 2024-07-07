const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();
const MovieController = require('./controller/MovieController'),
  UserController = require('./controller/UserController');

  // initialize mongodb
  require('./init/db.js');


const app = express();
const PORT = 3001;  // You can choose any port

// Define the target server and other options
const STREAM_API_URL = process.env.STREAM_API_URL;

// Proxy middleware options.
const options = {
  target: STREAM_API_URL,
  changeOrigin: true
};

const apiProxy = createProxyMiddleware(options);

app.use(cors());

// Use the proxy to forward requests starting with /api to the STREAM_API_URL
app.use('/vapi', apiProxy);

// get all movies
app.get('/api/movie/recommend', (req, res) => {
    MovieController.recommend(req, res);
});

// get movie by id
app.get('/api/movie/:id', (req, res) => {
    MovieController.getMovie(req, res);
});

// search movies
app.get('/api/entity/search', (req, res) => {
    MovieController.search(req, res);
});

// User routes

  // Create a new user
  app.post('/api/user/create', (req, res) => {
    UserController.create(req, res);
  });

  // Get all users
  app.get('/api/user', (req, res) => {
    UserController.getAllUsers(req, res);
  });

  // Get a user by ID
  app.get('/api/user/:id', (req, res) => {
    UserController.getUserById(req, res);
  });

  // Update a user
  app.put('/api/user/:id', (req, res) => {
    UserController.updateUser(req, res);
  });

  // Delete a user
  app.delete('/api/user/:id', (req, res) => {
    UserController.deleteUser(req, res);
  });

// Start the proxy server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
