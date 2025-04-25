const express = require("express");
const hostRouter = express.Router();

const rootdir = require("../utils/pathutils"); 
const homecontroller  = require("../controllers/homes");

hostRouter.get("/add-home", homecontroller.getAddHome);


hostRouter.post("/add-home", homecontroller.posthomeadded); // Route to handle home registration);

exports.hostRouter = hostRouter; // Exporting the hostRouter
