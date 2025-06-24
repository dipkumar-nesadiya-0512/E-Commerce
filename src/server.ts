import http from 'http';
import mongoose from 'mongoose';

import app from './app';

const server = http.createServer(app);

// GraphQL endpoint

(async () => {
    try {
        mongoose.set('strictQuery', false); // Disable strict query mode
        mongoose.set('debug', true); // Enable Mongoose debug mode for logging queries
        // MongoDB connection
        const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;
        await mongoose.connect(MONGODB_URI);
        console.log('Database connected successfully!');

        const PORT = process.env.PORT || 4000;
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        server.close(() => {
            mongoose.connection.close();
            console.log('Server terminated');
            process.exit(1);
        });
    }
})();
