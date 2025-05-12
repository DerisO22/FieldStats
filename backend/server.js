import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { errorHandler } from './middleware/errorHandler.js';

// Middleware Security
import { authenticateToken } from './middleware/auth.js';
import { signupLimiter } from './middleware/rate_limiter.js'

import initializeDatabase from './database/db.js';
import initializeSampleData from './database/db_data.js';
import jwt from 'jsonwebtoken'
dotenv.config();

const app = express();
const port = 3001;

app.use(cors({
    origin: (process.env.NODE_ENV === "production" ? 'domain' : 'http://localhost:5173'),
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

    /**
     * Sports Related API Endpoints
     */
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

    /**
     * Player Related API Endpoints
     */
    // Pretty sure their's 2000 players so don't load all of them
    app.get('/players_data', async (req, res) => {
        try {
            const query = `SELECT * FROM players
                           LIMIT 200;`;
            const result = await pgClient.query(query);
            res.json(result.rows);
        } catch (error) {
            console.error('Error fetching players data:', error);
            res.status(500).json({ error: error.message });
        }
    });

    // Get individual player details and their stats
    app.get('/players_data/player_profile/:player_id', async (req, res) => {
        try {
            const { player_id } = req.params;
            const query = `
            WITH player_sport_stats AS (
                SELECT 
                    ps.stat_id,
                    s.sport_id,
                    s.sport_name,
                    ps.season,
                    CASE s.sport_name
                        WHEN 'Basketball' THEN (SELECT row_to_json(bs) FROM basketball_stats bs WHERE bs.stat_id = ps.stat_id)
                        WHEN 'Baseball' THEN (SELECT row_to_json(bs) FROM baseball_stats bs WHERE bs.stat_id = ps.stat_id)
                        WHEN 'Football' THEN (SELECT row_to_json(fs) FROM football_stats fs WHERE fs.stat_id = ps.stat_id)
                        WHEN 'Soccer' THEN (SELECT row_to_json(ss) FROM soccer_stats ss WHERE ss.stat_id = ps.stat_id)
                        WHEN 'Volleyball' THEN (SELECT row_to_json(vs) FROM volleyball_stats vs WHERE vs.stat_id = ps.stat_id)
                        WHEN 'Tennis' THEN (SELECT row_to_json(ts) FROM tennis_stats ts WHERE ts.stat_id = ps.stat_id)
                        WHEN 'Track' THEN (SELECT row_to_json(ts) FROM track_stats ts WHERE ts.stat_id = ps.stat_id)
                        WHEN 'Swimming' THEN (SELECT row_to_json(ss) FROM swimming_stats ss WHERE ss.stat_id = ps.stat_id)
                        WHEN 'Wrestling' THEN (SELECT row_to_json(ws) FROM wrestling_stats ws WHERE ws.stat_id = ps.stat_id)
                        WHEN 'Golf' THEN (SELECT row_to_json(gs) FROM golf_stats gs WHERE gs.stat_id = ps.stat_id)
                        WHEN 'Softball' THEN (SELECT row_to_json(ss) FROM softball_stats ss WHERE ss.stat_id = ps.stat_id)
                        WHEN 'Lacrosse' THEN (SELECT row_to_json(ls) FROM lacrosse_stats ls WHERE ls.stat_id = ps.stat_id)
                        WHEN 'Field Hockey' THEN (SELECT row_to_json(fhs) FROM field_hockey_stats fhs WHERE fhs.stat_id = ps.stat_id)
                        WHEN 'Cross Country' THEN (SELECT row_to_json(ccs) FROM cross_country_stats ccs WHERE ccs.stat_id = ps.stat_id)
                        WHEN 'Hockey' THEN (SELECT row_to_json(hs) FROM hockey_stats hs WHERE hs.stat_id = ps.stat_id)
                        WHEN 'Ultimate Frisbee' THEN (SELECT row_to_json(ufs) FROM ultimate_frisbee_stats ufs WHERE ufs.stat_id = ps.stat_id)
                        WHEN 'Gymnastics' THEN (SELECT row_to_json(gs) FROM gymnastics_stats gs WHERE gs.stat_id = ps.stat_id)
                        WHEN 'Rugby' THEN (SELECT row_to_json(rs) FROM rugby_stats rs WHERE rs.stat_id = ps.stat_id)
                        WHEN 'Water Polo' THEN (SELECT row_to_json(wps) FROM water_polo_stats wps WHERE wps.stat_id = ps.stat_id)
                        WHEN 'Cheerleading' THEN (SELECT row_to_json(cs) FROM cheerleading_stats cs WHERE cs.stat_id = ps.stat_id)
                    END as stats
                FROM player_stats ps
                JOIN sports s ON ps.sport_id = s.sport_id
                WHERE ps.player_id = $1
            )
            SELECT 
                p.*,
                json_agg(pss) as stats
            FROM players p
            LEFT JOIN player_sport_stats pss ON p.player_id = $1
            WHERE p.player_id = $1
            GROUP BY p.player_id;`;
            const result = await pgClient.query(query, [player_id])

            console.log(result)

            if(result.rows.length === 0){
                res.status(404).json({ error: "Player Not Found"});
            }

            console.log(result.rows[0]);
            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error fetching player data:', error);
            res.status(500).json({ error: error.message });
        }
    })

    /**
     * School Related API Endpoints
     */
    app.get('/schools_data', async (req, res) => {
        try {
            const query = `SELECT * FROM schools
                           LIMIT 200;`
            
            const result = await pgClient.query(query);
            res.json(result.rows);
        } catch (error) {
            console.error('Error fetching school data', error);
            res.status(500).json({ error: error.message});
        }
    })

    app.get('/schools_data/:school_id', async (req, res) => {
        try {
            const { school_id } = req.params;
            const query = 'SELECT * FROM schools WHERE school_id = $1';

            const result = await pgClient.query(query, [school_id])

            if(result.rows.length === 0){
                res.status(404).json({ error: "School Not Found"});
            }

            console.log(result.rows[0]);
            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error fetching school data', error);
            res.status(500).json({ error: error.message});
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
            if ( username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
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

    app.post('/signup', signupLimiter, async (req, res) => {
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