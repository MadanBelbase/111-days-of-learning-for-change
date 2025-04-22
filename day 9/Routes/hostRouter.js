const path = require('path'); // Importing the path module

const express = require('express');
const hostRouter = express.Router();

const rootdir = require('../utils/pathutils'); // Importing root directory path from utils directory

hostRouter.get("/add-home",(req,res,next)=>{

    // res.sendFile(path.join(rootdir,"views","addHome.html"));
    // res.send(`
    //     <h1>Register Your Home</h1>
    //     <form action="/host/add-home" method="POST">
    //         <label for="name">Name:</label>
    //         <input type="text" id="name" name="name"
    //         placeholder = "Enter the name of your house"   required><br> <br>
    //         <button type="submit">Submit</button>
    //     </form>
    // `);
    res.render('addHome', { pageTitle: 'Register Your Home' }); // Render the addHome view
})

const registeredHome = []; // Array to store registered homes

hostRouter.post("/add-home",(req,res,next)=>{
    console.log('Home registered successfully : ' + req.body.housename);
    registeredHome.push({housename:req.body.housename}); // Push the registered home to the array
    // res.sendFile(path.join(rootdir,"views","homeadded.html"));
   
     res.render('homeadded', { pageTitle: 'Home Added Successfully' }); // Render the home 

    // console.log(req.body); // Log the submitted data
    // res.send(`
    //     <h1>Home Registered Successfully</h1>
    //     <a href="/">Go to Home</a>
    // `);
}
);

// module.exports = hostRouter; // Export the router to use in other files

exports.hostRouter = hostRouter; // Exporting the hostRouter
exports.registeredHome = registeredHome; // Exporting the registeredHome array