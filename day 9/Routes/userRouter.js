
// core modules

const path = require('path'); // Importing the path module
 // const rootdir = require('../utils/pathutils'); // Importing root directory path from utils directory


// external modules
const express = require('express');
const userRouter = express.Router();

// const registeredHome = require('./hostRouter').registeredHome; // Importing registeredHome from hostRouter
 
const {registeredHome} = require('./hostRouter');

// Middleware to log request details
userRouter.get("/",(req,res,next) => {
    console.log(registeredHome);
    //   res.sendFile(path.join(rootdir,"views","home.html"));

    res.render('home',{registeredHome: registeredHome, pageTitle: 'airbnb Home'}); // Render the home view and pass the registeredHome array to it
        
}
);

module.exports = userRouter; // Export the router to use in other files

