
// core modules

const path = require('path'); // Importing the path module
const rootdir = require('../utils/pathutils'); // Importing root directory path from utils directory


// external modules
const express = require('express');
const userRouter = express.Router();


// Middleware to log request details
userRouter.get("/",(req,res,next) => {
    
    res.sendFile(path.join(rootdir,"views","home.html"));
      //__dirname, "../"
    // res.send(`<h1> Welome to airbnb </h1>
    //      <a href="/host/add-home">Add-Home</a>
    //     `); // ✅ No next() after sending response
}
);

module.exports = userRouter; // Export the router to use in other files

