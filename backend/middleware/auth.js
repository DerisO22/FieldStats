import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ error: "Authentication Required"});
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;
        next();

    } catch (err) {
        return res.status(403).json({ error: "Invalid Token"})
    }
}