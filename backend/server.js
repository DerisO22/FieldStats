import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorHandler.js';
import { authenticateToken } from './middleware/auth.js';
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

async function setupApp() {
    const pgClient = new pg.Client({
        database: process.env.DATABASE_DATABASE,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USERNAME
    });
    
    await pgClient.connect();

    // Home Page API Endpoints
    app.get('/data', authenticateToken, (req, res) => {
        pgClient.query('SELECT * FROM posts;')
    })

    app.post('/login', (req, res) => {
        const { username, password } = req.body;
    
        console.log('Login request received:', req.body);
        
        console.log(`Username: ${username}, Password: ${password}`);

        // Successful Login
        if ( username === "ADMIN" && password === "ADMIN") {
            const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '24h'});
            res.cookie('token', token, { httpOnly: true});
            res.json({ success: true });
        } else { 
            res.status(401).json({ success: false });
        }
    })
    
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server running on port ${port}`);
    })
}

setupApp();