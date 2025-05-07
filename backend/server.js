import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorHandler.js';
import { authenticateToken } from './middleware/auth.js';
import initializeDatabase from './database/db.js';
import initializeSampleData from './database/db_data.js';
import jwt from 'jsonwebtoken'
dotenv.config();

const app = express();
const port = 3001;

app.use(cors({
    origin: (process.env.NODE_ENV ? 'domain' : 'http://localhost:5173'),
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
        await initializeDatabase();
        await loadSampleData();
    } catch (err) {
        console.error('Failed to initialize database schema:', err);
    }

    const pgClient = new pg.Client({
        database: process.env.DATABASE_DATABASE,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USERNAME
    });
    
    try {
        await pgClient.connect();
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error:', err);
    }

    // Sports Page API Endpoints
    app.get('/sports_data', async (req, res) => {
        try {
            const query = 'SELECT * FROM sports;';
            const result = await pgClient.query(query);
            res.json(result.rows);
        } catch (error) {
            console.error('Error fetching sports data:', error);
            res.status(500).json({ error: error.message });
        }
    });

    // Protected API Endpoints (Editing/Deleting/Adding):
    

    /**
     * Authentication Endpoints
     */
    app.post('/login', (req, res) => {
        const { username, password } = req.body;
    
        console.log('Login request received:', req.body);
        
        console.log(`Username: ${username}, Password: ${password}`);

        // Check For an Admin Login
        if ( username === "ADMIN" && password === "ADMIN") {
            const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '24h'});
            res.cookie('token', token, { httpOnly: true});
            res.json({ success: true });
        } else { 
            res.status(401).json({ success: false });
        }

        // Check for A Regular Login by checking Database(users table)
        
    })

    app.post('/signup', (req, res) => {
        const { username, password } = req.body;

        console.log('Signup Request Recieved: ', req.body);
        console.log(`Username: ${username}, Password: ${password}`);

        // Check If username or password exist in the database

    })
    
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server running on port ${port}`);
    })
}

setupApp();