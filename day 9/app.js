//core module 

const path = require('path'); // Importing the path module


//External modules
const express = require('express');

// Internal modules 
const userRouter = require('./Routes/userRouter'); // Importing userRouter from Routes directory
const {hostRouter} = require('./Routes/hostRouter');

const rootdir = require('./utils/pathutils'); // Importing root directory path from utils directory

const app = express(); // Create an instance of express

app.set('view engine', 'ejs'); // Set the view engine to EJS
//  ! it is used to render dynamic HTML pages ejs is a templating engine which is used to render dynamic HTML pages

app.set('views' , 'views'); // Set the views directory to views
 
app.use(express.static(path.join(rootdir, 'public')))// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to serve static files from the public directory

app .use(express.urlencoded({ extended: true })); //Middleware to parse URL-encoded data
app.use(userRouter);
app.use("/host",hostRouter);

// ! order must be correct otherwise it will not work

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(rootdir,'views','404.html')) 
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});


const port = 3000;
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
}
);