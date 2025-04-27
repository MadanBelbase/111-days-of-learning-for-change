// Core Modules
const path = require('path');

// External Modules
const express = require('express');
const storeRouter = express.Router();

// Internal Modules
const homecontroller = require("../controllers/storeController"); // ✅ fixed controller path

// Routes
storeRouter.get("/",homecontroller.getindex);
storeRouter.get("/bookings", homecontroller.getbookings);
storeRouter.get("/favourite", homecontroller.getfavoritelist);
storeRouter.get("/homes",  homecontroller.getHome);

// Export the router
module.exports = storeRouter;
