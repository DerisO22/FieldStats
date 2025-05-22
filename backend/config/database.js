import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    database: process.env.DATABASE_DATABASE,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USERNAME
} 

export const createClient = () => new pg.Client(dbConfig);