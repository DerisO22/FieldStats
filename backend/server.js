import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Login request received:', req.body);
    
    console.log(`Username: ${username}, Password: ${password}`);
    if ( username === "ADMIN" && password === "ADMIN") {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
})
