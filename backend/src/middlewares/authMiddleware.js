const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ 
            error: 'Access denied, no token provided' 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //attach user information to request object
        next();
    } catch (error) {
        return res.status(401).json({ 
            error: 'Invalid token' 
        });
    }
}

module.exports = authMiddleware
