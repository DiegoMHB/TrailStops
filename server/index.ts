import express from 'express';
import createServer from './server'; 
import mongoose from './models'; 

const port: number = 3001;

mongoose.connection.once('open', () => {
  const app: express.Application = createServer();
  
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
