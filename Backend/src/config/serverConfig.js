import dotenv from 'dotenv';
dotenv.config();//load env variables from .env file [dotenv.config() loads them into: process.env]
//process is a global object provided by Node.js.
//process.env is an object that contains environment variables.



export const DB_URL = process.env.DB_URL;
export const DB_URL_NON_SRV = process.env.DB_URL_NON_SRV;



export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const JWT_SECRET = process.env.JWT_SECRET;
