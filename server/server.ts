import express from 'express';
import router from './router';
import cors from 'cors';

function createServer(): express.Express {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/', router);
    return app;
}

// Export the createServer function
export default createServer;
