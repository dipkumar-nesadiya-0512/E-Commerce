import express, { Application, Request, Response, NextFunction } from 'express';

// Request logging middleware
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip || req.connection.remoteAddress || 'unknown';

    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

    next();
};

export default (app: Application) => {
    // Add request logging middleware first
    app.use(requestLogger);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};
