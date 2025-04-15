const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    //* req.url provides the URL of the request made by the client
    //* req.method provides the HTTP method of the request (GET, POST, etc.)
    //* req.headers provides the headers sent by the client

   //? Routing based on URL and HTTP method
if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html>');
    res.write('<head><title>Backend time with Node.js</title></head>');
    res.write('<body> <h1>Enter Your details</h1>');
    res.write('<form action="/submit" method="POST">');
    //! Form to submit user details to the server using POST method
    res.write('<input type="text" name="name" placeholder="Enter your name" />');
    res.write('<br><label for="male">Male</label>');
    res.write('<input type="radio" name="gender" id="male" value="male">');
    res.write('<label for="female">Female</label>');
    res.write('<input type="radio" name="gender" value="female" id="female">');
    res.write('<br><input type="submit" value="Submit" />');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end(); //? Ensure response is ended after sending home page
} 
else if (req.url.toLowerCase() === "/submit" && req.method === "POST") {
    //? Handle POST request to /submit URL
    //? fs.writeFileSync is a synchronous function that writes data to a file
    fs.writeFileSync('user.txt', "madan Belbase"); //? Write user details to a file named user.txt in the current directory

    res.writeHead(302, { 'Location': '/' }); //? Redirect to home page
    return res.end(); //? Ensure response is ended after redirect
}
   
//? Set default response
    res.setHeader('Content-Type', 'text/html'); //? Setting header to send HTML content
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my first page</h1></body>');
    res.write('</html>');
    res.end(); //? Ensure the response is properly ended for all requests

});

const port = 3000;
server.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`); //? Log message when server starts
});
//! This code snippet creates a server that listens for requests on port 3000.

//! The server responds to requests based on the URL and HTTP method of the request.