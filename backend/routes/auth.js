import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authenticateToken } from '../middleware/auth.js';
import { signupLimiter, deleteUserLimiter } from '../middleware/rate_limiter.js';
const router = express.Router();

/**
 * Authentication Endpoints
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    console.log('Login request received:', req.body);
    console.log(`Username: ${username}, Password: ${password}`);

    try {
        let isAdmin = false;
        let user = null;

        // Check For an Admin Login FIRST
        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            isAdmin = true;
            user = { username, isAdmin: true };
        } else {
            // Check for A Regular Login by checking Database
            const result = await req.pgClient.query(`SELECT user_id, username, password_hash
                                                    FROM users WHERE username = $1
                                                `, [username]);
            
            if (result.rows.length === 0) {
                return res.status(404).json({ success: false, error: 'Username does not exist'})
            }

            // Check password by unencrypting the users password_hash
            const dbUser = result.rows[0];
            const passwordMatch = await bcrypt.compare(password, dbUser.password_hash);

            console.log('Database user:', dbUser);
            console.log('Password match:', passwordMatch);

            if (!passwordMatch) {
                return res.status(401).json({ success: false, error: 'Invalid password' });
            }

            user = { username: dbUser.username, isAdmin: false };
        }

        // Create JWT token with user info INCLUDING isAdmin flag
        const token = jwt.sign(
            { 
                username: user.username, 
                isAdmin: user.isAdmin 
            }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: '24h' }
        );

        res.cookie('token', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict'
        });
        
        res.json({ success: true });

    } catch(error) {
        console.log('Error Logging In:', error);
        res.status(500).json({ error: 'Server Error' });
    }
})

router.post('/signup', signupLimiter, async (req, res) => {
    const { username, password } = req.body;

    console.log('Signup Request Received: ', req.body);
    console.log(`Username: ${username}, Password: ${password}`);

    // Check If username or password exist in the database
    try {
        const userExists = await req.pgClient.query(`SELECT username 
                                                    FROM users 
                                                    WHERE username = $1`, [username]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Username already exists'});
        }

        // Prevent someone from signing up with admin credentials
        if (username === process.env.ADMIN_USERNAME) {
            return res.status(400).json({ error: 'Invalid Username'});
        }

        // Hashing with bcrypt
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        await req.pgClient.query(`INSERT INTO users (username, password_hash) VALUES ($1, $2)
                                `, [username, passwordHash]);
        
        res.status(201).json({ message: 'User successfully created'})

    } catch (error) {
        console.log('Error Signing Up: ', error);
        res.status(500).json({ error: 'Server Error' });
    }
})

router.get('/verify', authenticateToken, async(req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Invalid Token'});
        }

        const { username, isAdmin } = req.user;
        
        console.log('Token verification successful:', { username, isAdmin });

        res.json({
            username,
            isAdmin: isAdmin || false,
            authenticated: true
        })
    } catch (error) {
        console.error('Token verification error: ', error);
        res.status(401).json({ error: 'Token verification failed'});
    }
})

// Add a logout endpoint
router.post('/logout', (req, res) => {
    res.cookie('token', '', { 
        httpOnly: true,
        expires: new Date(0) 
    });
    res.json({ success: true, message: 'Logged out successfully' });
});

router.delete('/user/:username', deleteUserLimiter, authenticateToken, async(req, res) => {
    try {
        const { username } = req.params;
        
        // Only admin can delete users
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: 'Forbidden: Only admin can delete users' });
        }

        // Prevent admin from deleting themselves
        if (username === process.env.ADMIN_USERNAME) {
            return res.status(400).json({ error: 'Cannot delete admin user' });
        }

        const query = `DELETE FROM users WHERE username = $1`
        const result = await req.pgClient.query(query, [username]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User successfully deleted'})
    } catch (error) {
        console.log('Error Deleting User: ', error);
        res.status(500).json({ error: 'Server Error' });
    }
})

export default router;