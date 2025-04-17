const http = require('http');
const { requestHandler } = require('./handler');

const server = http.createServer(requestHandler);

const port = 3000;
server.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
