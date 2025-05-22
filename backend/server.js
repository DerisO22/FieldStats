import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorHandler.js';

// Database related imports
import initializeDatabase from './database/db.js';
import initializeSampleData from './database/db_data.js';
import { createClient } from './config/database.js';
const client = createClient();

dotenv.config();

// Routes and API Endpoints imports
import sportRoutes from './routes/sports.js';
import playerRoutes from './routes/players.js';
import schoolRoutes from './routes/schools.js';
import newsRoutes from './routes/news.js';
import authRoutes from './routes/auth.js';

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: (process.env.NODE_ENV === "production" ? process.env.PROD_URL : `http://localhost:5173`),
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)

async function loadSampleData() {
    try {
        initializeSampleData();
        console.log("Successfully Loaded Sample Data");
    } catch (err) {
        console.log(`Error Loading Sample Data: ${err}`);
    }
}

async function setupApp() {
    try {
        // Connect to database and put in data
        await initializeDatabase(client);
        await loadSampleData();
    } catch (err) {
        console.error('Failed to initialize database schema:', err);
    }

    app.use((req, res, next) => {
        req.pgClient = client;
        next();
    })

    // Routes
    app.use('/sports_data', sportRoutes);
    app.use('/players_data', playerRoutes);
    app.use('/schools_data', schoolRoutes);
    app.use('/news_data', newsRoutes);
    app.use('/', authRoutes);

    app.listen(port, '0.0.0.0', () => {
        console.log(`Server running on port ${port}`);
    })
}

setupApp();