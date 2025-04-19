const http = require('http');

const server = http.createServer( (req, res) => { 
    console.log(req);
}
);
const port = 3001;
server.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`); //? Log message when server starts
});
