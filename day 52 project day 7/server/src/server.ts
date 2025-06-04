// server/src/server.ts
import express from 'express';
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const PORT = 3000;  

dotenv.config();

app.use(
    cors({
      origin: 'http://localhost:5173', 
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true, 
    })
  );

const port= process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
