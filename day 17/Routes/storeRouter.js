// Core Modules
const path = require('path');

// External Modules
const express = require('express');
const storeRouter = express.Router();

// Internal Modules
const storecontroller = require("../controllers/storeController"); // ✅ fixed controller path

// Routes
storeRouter.get("/",storecontroller.getindex);
storeRouter.get("/bookings",storecontroller.getbookings);
storeRouter.get("/favourite",storecontroller.getfavoritelist);
storeRouter.get("/homes", storecontroller.getHome);
storeRouter.get("/homes/:homeId", storecontroller.getHomeDetails);
storeRouter.post("/favourite", storecontroller.postAddTofavourite);
// Export the router
module.exports = storeRouter;
