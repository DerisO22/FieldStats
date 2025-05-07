import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
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
    // All Sports
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

    // Specific Sports
    app.get('/sports_data/:sportName', async(req, res) => {
        try {
            const { sportName } = req.params;
            console.log(sportName)
            const query = 'SELECT * FROM sports WHERE LOWER(sport_name) = LOWER($1);';
            const result = await pgClient.query(query, [sportName]);
            
            if(result.rows.length === 0){
                res.status(404).json({ error: "Sport Not Found"});
            }

            console.log(result.rows[0]);
            res.json(result.rows[0]);
        } catch(error) {
            console.error('Error fetching sports data:', error);
            res.status(500).json({ error: error.message });
        }
    })

    // Protected API Endpoints (Editing/Deleting/Adding):
    

    /**
     * Authentication Endpoints
     */
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;
        
        console.log('Login request received:', req.body);
        
        console.log(`Username: ${username}, Password: ${password}`);

        try {
            // Check For an Admin Login
            if ( username === "ADMIN" && password === "ADMIN") {
                const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '24h'});
                res.cookie('token', token, { httpOnly: true});
                res.json({ success: true });
            } 

            // Check for A Regular Login by checking Database
            const result = await pgClient.query(`SELECT user_id, username, password_hash
                                                 FROM users WHERE username = $1
                                                `, [username]);
            
            if (result.rows.length === 0) {
                return res.status(404).json({ success: false, error: 'Username does not exist'})
            }

            // Check password by unecrypting the users password_hash
            const user = result.rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password_hash);

            console.log(user);
            console.log(passwordMatch)

            if (passwordMatch) {
                const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '24h'});
                res.cookie('token', token, { httpOnly: true});
                res.json({ success: true });
            } else { 
                console.log(passwordMatch);
                res.status(401).json({ success: false });
            }
        } catch(error) {
            console.log('Error Logging In');
            res.status(500).json({ error: 'Server Error' });
        }
        
    })

    app.post('/signup', async (req, res) => {
        const { username, password } = req.body;

        console.log('Signup Request Recieved: ', req.body);
        console.log(`Username: ${username}, Password: ${password}`);

        // Check If username or password exist in the database
        try {
            const userExists = await pgClient.query(`SELECT username 
                                                     FROM users 
                                                     WHERE username = $1`, [username]);
            if (userExists.rows.length > 0) {
                return res.status(400).json({ error: 'Username already exists'});
            }

            // Hashing with bcrypt
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            await pgClient.query(`INSERT INTO users (username, password_hash) VALUES ($1, $2)
                                  `, [username, passwordHash]);
            
            res.status(201).json({ message: 'User successfully created'})

        } catch (error) {
            console.log('Error Signing Up: ', error);
            res.status(500).json({ error: 'Server Error' });
        }
    })
    
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server running on port ${port}`);
    })
}

setupApp();