
// core modules

const path = require('path'); // Importing the path module
 // const rootdir = require('../utils/pathutils'); // Importing root directory path from utils directory


// external modules
const express = require('express');
const userRouter = express.Router();

// const registeredHome = require('./hostRouter').registeredHome; // Importing registeredHome from hostRouter
 
const {registeredHome} = require('./hostRouter');

const homecontroller  = require("../controllers/homes");
// Middleware to log request details
userRouter.get("/", homecontroller.getHome);

module.exports = userRouter; // Export the router to use in other files

