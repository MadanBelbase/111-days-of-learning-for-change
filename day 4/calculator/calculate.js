const calculatehandler = (req, res) => {
    console.log("In calculate handler");

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
        console.log( "1 - body: ", body );
    });

    req.on('end', () => {
        const parsedBody = new URLSearchParams(body);
        const num1 = parseFloat(parsedBody.get('num1'));
        const num2 = parseFloat(parsedBody.get('num2'));
        const operation = parsedBody.get('operation');

        let result;
        switch (operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
                break;
            default:
                result = 'Invalid operation';
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html>');
        res.write('<head><title>Calculation Result</title></head>');
        res.write('<body>');
        res.write(`<h1>Result: ${result}</h1>`);
        res.write('<a href="/calculator">Back to Calculator</a>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    });
};

module.exports = { calculatehandler };
