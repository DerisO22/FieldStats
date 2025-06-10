import path from 'path'
import pg from 'pg'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.resolve(__dirname, "sample_data.sql")

// Used to execute queries in sample_data.sql
async function initializeSampleData() {
    const client = new pg.Client({
        // Environment Variables
        database: process.env.DATABASE_DATABASE,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USERNAME
    });

    try {
        await client.connect();
        const sqlScript = fs.readFileSync(dbPath, 'utf8');
        await client.query(sqlScript);
    } catch (err) {
        console.log("error Loading Sample Data:", err);
        throw err;
    } finally {
        await client.end();
    }
}

export default initializeSampleData;