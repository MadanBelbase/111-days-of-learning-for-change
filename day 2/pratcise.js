const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  
  let pageContent = '';
  if (req.url === '/' || req.url === '/home') {
    pageContent = '<h1>Welcome to the Home Page</h1>';
  } else if (req.url === '/men') {
    pageContent = '<h1>Men\'s Section</h1>';
  } else if (req.url === '/women') {
    pageContent = '<h1>Women\'s Section</h1>';
  } else if (req.url === '/kids') {
    pageContent = '<h1>Kids\' Section</h1>';
  } else if (req.url === '/cart') {
    pageContent = '<h1>Your Shopping Cart</h1>';
  } else if (req.url === '/contact') {
    pageContent = '<h1>Contact Us</h1>';
  } else {
    res.writeHead(404);
    pageContent = '<h1>404 Not Found</h1>';
  }

  res.write(`<!DOCTYPE html>
<html>
<head>
    <title>Maddy</title>
</head>
<body>
    <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/men">Men</a></li>
        <li><a href="/women">Women</a></li>
        <li><a href="/kids">Kids</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
    ${pageContent}
</body>
</html>`);
  
  res.end();
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});