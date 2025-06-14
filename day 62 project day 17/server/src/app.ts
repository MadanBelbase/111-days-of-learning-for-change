import express, { Application } from 'express';
import cors from 'cors';
import  userRouter  from './routes/userRouter'; // Import userRouter

const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Enable CORS with custom options
app.use(cors({
  origin: 'http://localhost:5173',  // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Allowed methods
  preflightContinue: false  // Do not pass the request to the next handler
}));
// Routes
app.use(userRouter);

export default app;
