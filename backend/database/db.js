import path from 'path'
import pg from 'pg'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.resolve(__dirname, "db.sql")

async function initializeDatabase() {
    const client = new pg.Client({
        database: process.env.DATABASE_DATABASE,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USERNAME
    });

    try {
        await client.connect();
        console.log('Connected to database successfully');

        const sqlScript = fs.readFileSync(dbPath, 'utf8');
        await client.query(sqlScript);
        console.log('Database schema initialized successfully');
    } catch (err) {
        console.error('Error initializing database:', err);
        throw err;
    } finally {
        await client.end();
    }
}

export default initializeDatabase;