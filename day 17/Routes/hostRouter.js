const express = require("express");
const hostRouter = express.Router();

const rootdir = require("../utils/pathutils");
const homecontroller = require("../controllers/hostController");

hostRouter.get("/add-home", homecontroller.getAddHome);
hostRouter.post("/add-home", homecontroller.posthomeadded);
hostRouter.get("/host-home-list", homecontroller.gethostHome);
hostRouter.get("/edit-home/:homeId", homecontroller.getEditHome);
hostRouter.post("/home-edit", homecontroller.postEdithomeadded);
hostRouter.post("/delete-home/:homeId", homecontroller.postDeleteHome); // Uncomment if delete functionality is needed


module.exports = hostRouter; // Exporting the hostRouter
