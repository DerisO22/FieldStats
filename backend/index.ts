import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/data', (req, res) => {
    res.json({ message: "Hello"});
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
})
