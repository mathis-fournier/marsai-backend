const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
require('dotenv').config();

const authenticateToken: any = (req: any, res: any, next: Function): any => {
    
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send("Accès refusé");
    }
    // Extract token
    const token = authHeader.split(" ")[1];
    jwt.verify(token, (process.env.JWT_SECRET as string).trim(), (err: Error, decoded: any) => {
        
        // Handle invalid or expired token
        if (err) {
            return res.status(403).send("Token invalide ou expiré");
        }

        // Token is valid, attach decoded info to request
        req.user = decoded;
        next();
    });
};

export default authenticateToken;