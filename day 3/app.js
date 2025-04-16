const http = require('http');
const Requesthandler = require('./user');

const server = http.createServer(Requesthandler);


const port = 3000;
server.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`); //? Log message when server starts
});