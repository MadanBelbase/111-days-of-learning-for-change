const http = require('http');
const express = require('express');

const app = express(); // Create an instance of express

app.use("/", (req, res) => {
    console.log("In the middleware 1");
    res.send("<h1>Hello from Middleware 1</h1>"); // ✅ No next() after sending response
});

app.use("/Home", (req, res) => { 
    console.log("In the middleware 2");
    res.send("<h1>Hello from Middleware 2</h1>"); // ✅ No next() after sending response
});

const server = http.createServer(app);

const port = 3000;
server.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});




 // * use   it is a method of express that allows you to add middleware functions to your application. Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. They can perform various tasks, such as modifying the request or response objects, ending the request-response cycle, or calling the next middleware function in the stack. // !  also is used to match any route