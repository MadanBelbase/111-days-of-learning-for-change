require('dotenv').config()

const path = require('path');
const express = require('express');

// Internal modules
const storeRouter = require('./Routes/storeRouter.js');
const hostRouter = require('./Routes/hostRouter.js');
const rootdir = require('./utils/pathutils.js');
const { mongoconnect } = require('./utils/databaseutils.js'); // ✅ Use destructuring
const errorhandler = require('./controllers/error.js');

const app = express();

// Set view engine and views folder
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(express.static(path.join(rootdir, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(storeRouter);
app.use("/host", hostRouter);

// 404 handler
app.use(errorhandler.error404);

// Load port from .env, and use a default if not provided
const port = process.env.PORT; // ✅ Port is defined directly from .env

// ✅ Connect to MongoDB and then start the server
mongoconnect(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
});
