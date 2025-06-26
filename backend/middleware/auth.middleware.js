import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/config.js";

export const authMiddleware = (req, res, next) => {
    try {

        const token = req.header('Authorization')?.replace("Bearer ","");

        if(!token){
            return res.status(401).json({msg: 'Required token'})
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)
        req.userId = decoded.userId;
        next();

    } catch (error) {
        res.status(401).json({msg: 'Invalid token'})
    }

}