const fs = require("fs");
const userRequesthandler = (req, res) => {
  console.log(req.url, req.method);

  //* req.url provides the URL of the request made by the client
  //* req.method provides the HTTP method of the request (GET, POST, etc.)
  //* req.headers provides the headers sent by the client

  //? Routing based on URL and HTTP method
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html>");
    res.write("<head><title>Backend time with Node.js</title></head>");
    res.write("<body> <h1>Enter Your details</h1>");
    res.write('<form action="/submit" method="POST">');
    //! Form to submit user details to the server using POST method
    res.write(
      '<input type="text" name="name" placeholder="Enter your name" />'
    );
    res.write('<br><label for="male">Male</label>');
    res.write('<input type="radio" name="gender" id="male" value="male">');
    res.write('<label for="female">Female</label>');
    res.write('<input type="radio" name="gender" value="female" id="female">');
    res.write('<br><input type="submit" value="Submit" />');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end(); //? Ensure response is ended after sending home page
  } else if (req.url.toLowerCase() === "/submit" && req.method === "POST") {
    //!  chunk is a buffer object that contains the data sent by the client
    const body = []; // Array to store chunks of data sent by the client
    req.on("data", (chunk) => {
      console.log(" chunk of given data is: ", chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      // This event listener is triggered when the entire request body has been received.

      const fullname = Buffer.concat(body).toString();
      // Combines all the buffered chunks stored in the 'body' array into a single Buffer,
      // then converts it to a string. This represents the complete data sent by the client.

      console.log("Full name is: ", fullname);
      // Logs the received data to the console for debugging or informational purposes.

      const params = new URLSearchParams(fullname);
      // Parses the string into key-value pairs, assuming the data is in URL-encoded format (e.g., 'key1=value1&key2=value2').
      const bodyobject = {};
      for (const [key, value] of params.entries()) {
        bodyobject[key] = value;
        // Iterates over each key-value pair and adds them to the 'bodyobject'.
      }

      console.log("bodyobject is: ", bodyobject);
      // Logs the constructed object containing the parsed data.

      fs.writeFileSync("Data.txt", JSON.stringify(bodyobject), (err) => {
        console.log('Data is written to file');
        res.writeHead(302, { 'Location:' : '/' });
        return res.end();
      });
    });
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<html>');
    res.write('<head><title>Page Not Found</title></head>');
    res.write('<body><h1>Page Not Found</h1></body>');
    res.write('</html>');
    return res.end();
  }

  // //? Set default response
  //     res.setHeader('Content-Type', 'text/html'); //? Setting header to send HTML content
  //     res.write('<html>');
  //     res.write('<head><title>My First Page</title></head>');
  //     res.write('<body><h1>Hello from my first page</h1></body>');
  //     res.write('</html>');
  //     res.end(); //? Ensure the response is properly ended for all requests
};

module.exports = userRequesthandler; //? Export the userRequesthandler function for use in other modules
