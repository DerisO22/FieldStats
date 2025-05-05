import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

async function setupApp() {
    const pgClient = new pg.Client({
        database: process.env.DATABASE_DATABASE,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USERNAME
    });
    
    await pgClient.connect();

    app.get('/data', (req, res) => {
        pgClient.query('SELECT * FROM posts;')
    })

    app.post('/login', (req, res) => {
        const { username, password } = req.body;
    
        console.log('Login request received:', req.body);
        
        console.log(`Username: ${username}, Password: ${password}`);
        if ( username === "ADMIN" && password === "ADMIN") {
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