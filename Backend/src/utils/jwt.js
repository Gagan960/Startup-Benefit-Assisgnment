import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig.js';

export const generateJwtToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '3d' });
    return token;
}

export const verifyJwt = (token) => {
    return jwt.verify(token, JWT_SECRET);
}