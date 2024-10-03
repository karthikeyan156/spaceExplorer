import express, { json, urlencoded } from "express";
const app = express();
import cors from 'cors';
const port = 2000;
import dotenv from 'dotenv'; 
dotenv.config(); 



// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes

import nasaRoutes from './routes/nasaRoutes.js';
import userRoutes from './routes/userRoutes.js'

app.use("/nasa", nasaRoutes);
app.use("/user",userRoutes);
app.get('/', (req, res) => {
  res.status(200).json("Hello world");
});

// Start the server
app.listen(port, () => {
  console.log(`This application is working on port ${port}`);
});