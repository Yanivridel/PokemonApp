import express from 'express'
import cors from "cors"
import dotenv from 'dotenv'
import mongoose from 'mongoose'

const app = express(); 
const PORT = 3000;

// Middleware Configuration
dotenv.config();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.DB_URI).then(() => console.log("Successfully Connected to DB"));

// Routes
import userRoutes from './routes/userRoutes.js'

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hello from the server!",
  });
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
