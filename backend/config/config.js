import dotenv from 'dotenv';
dotenv.config();

export const TOKEN_API_TMDB = process.env.TOKEN_API_TMDB;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const CLUSTER = process.env.CLUSTER;
export const DATABASE = process.env.DATABASE;
export const JWT_SECRET = process.env.JWT_SECRET;