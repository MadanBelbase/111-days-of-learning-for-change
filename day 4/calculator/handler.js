const calculatehandler = require('./calculate').calculatehandler;

const requestHandler = (req, res) => {
    console.log(req.url, req.method);

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html>');
        res.write('<head><title>Calculator</title></head>');
        res.write('<body><h1>Welcome to the Calculator Home Page</h1>');
        res.write('<a href="/calculator">Go to Calculator</a>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    else if (req.url === '/calculator' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html>');
        res.write('<head><title>Calculator</title></head>');
        res.write('<body><h1>Calculator</h1>');
        res.write('<form action="/calculate" method="POST">');
        res.write('<input type="number" name="num1" placeholder="Enter first number" required />');
        res.write('<input type="number" name="num2" placeholder="Enter second number" required />');

        res.write('<button type="submit" name="operation" value="add">Add</button>');
        res.write('<button type="submit" name="operation" value="subtract">Subtract</button>');
        res.write('<button type="submit" name="operation" value="multiply">Multiply</button>');
        res.write('<button type="submit" name="operation" value="divide">Divide</button>');

        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    else if (req.url === '/calculate' && req.method === 'POST') {
        calculatehandler(req, res);
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<html>');
        res.write('<head><title>Page Not Found</title></head>');
        res.write('<body><h1>404 - Page Not Found</h1>');
        res.write('<p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>');
        res.write('<a href="/">Return to Home Page</a>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
};

module.exports = { requestHandler };