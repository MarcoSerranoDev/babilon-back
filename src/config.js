import { config } from 'dotenv';

config();

export const MONGODB_URL = process.env.MONGODB_URL;

// export const MONGODB_URL = process.env.MONGODB_URL_TEST;

export const SECRET = process.env.SECRET;
