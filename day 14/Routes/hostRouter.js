const express = require("express");
const hostRouter = express.Router();

const rootdir = require("../utils/pathutils");
const homecontroller = require("../controllers/hostController");

hostRouter.get("/add-home", homecontroller.getAddHome);

hostRouter.post("/add-home", homecontroller.posthomeadded);
hostRouter.get("/host-home-list", homecontroller.gethostHome);
module.exports = hostRouter; // Exporting the hostRouter
