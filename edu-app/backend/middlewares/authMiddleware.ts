import { SECRET_KEY } from "../server";

const jwt = require('jsonwebtoken');

export const verify_user = async (req: any, res: any, next: any) => {
    console.log(req)
    const token = req.headers['cookie']?.replace('authToken=', '') || ''; // Get the token from the cookie header

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing. Please log in.' }); // If there's no token, return unauthorized
    }

    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Auth Token Verification Failed' }); // If token is invalid, return forbidden
        }
        req.user = user; // Store user information in request
        console.log('Token is valid. Decoded payload:', user);
        res.status(200).json({
                    message: 'User verified successfully',
                    user: req.user // Send the user data to the client
                });
        next(); // Call next to pass control to the next middleware or route handler
    });
};


