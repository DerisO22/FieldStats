import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
    // Check cookies are available
    if (!req.cookies) {
        return res.status(500).json({ 
            error: 'Server configuration error: Cookie parser not configured' 
        });
    }

    const token = req.cookies.token;

    // Double check
    if (!token) {
        return res.status(401).json({ 
            error: "Authentication Required - No token found in cookies" 
        });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;
        next();
    } catch (err) {
        console.error('JWT verification error:', err.message);
        return res.status(403).json({ 
            error: "Invalid Token" 
        });
    }
};

export { authenticateToken };