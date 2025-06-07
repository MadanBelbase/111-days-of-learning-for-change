import app from './app';
import { config } from 'dotenv';

config(); // Load environment variables from .env file
const { PORT } = process.env;

const port = PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
