//core module 

const path = require('path'); // Importing the path module


//External modules
const express = require('express');

// Internal modules 
const userRouter = require('./Routes/userRouter'); // Importing userRouter from Routes directory
const hostRouter = require('./Routes/hostRouter');

const rootdir = require('./utils/pathutils'); // Importing root directory path from utils directory

const app = express(); // Create an instance of express


app .use(express.urlencoded({ extended: true })); //Middleware to parse URL-encoded data
app.use(userRouter);
app.use("/host",hostRouter);

// ! order must be correct otherwise it will not work

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootdir,'views','404.html'))
});


const port = 3000;
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
}
);