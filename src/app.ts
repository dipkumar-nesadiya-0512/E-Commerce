import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express, { Application, Request, Response } from 'express';
import middleware from './middleware';
import routes from './routes';

const app: Application | any = express();

// Middleware
middleware(app);

// Routes
routes(app);

// Health check route
app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('Server is healthy');
});

app.all('/*', (req: Request, res: Response) => {
    res.status(404).json({
        message: 'Route not found',
        status: 404,
    });
});

export default app;
