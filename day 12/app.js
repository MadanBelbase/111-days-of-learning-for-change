//core module 

const path = require('path'); // Importing the path module


//External modules
const express = require('express');

// Internal modules 
const userRouter = require('./Routes/userRouter'); // 
const {hostRouter} = require('./Routes/hostRouter');

const rootdir = require('./utils/pathutils'); 

const app = express(); // Create an instance of express

app.set('view engine', 'ejs'); 
app.set('views' , 'views'); // Set the views directory to views
 
app.use(express.static(path.join(rootdir, 'public')))

app .use(express.urlencoded({ extended: true })); 

app.use(userRouter);
app.use("/host",hostRouter);

const errorhandler =  require("./controllers/error.js");

app.use(errorhandler.error404);


const port = 3000;
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
}
);