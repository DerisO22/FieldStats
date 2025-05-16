import express from 'express';
const router = express.Router();

/**
 * News Related API Endpoints
 */
// 'All' news data
router.get('/', async (req, res) => {
    try {
        const query = `SELECT * FROM news 
                    LIMIT 100;`
        const result = await req.pgClient.query(query);

        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching news data: ', error);
        res.status(500).json({ error: error.message });
    }
})

// featured news data
router.get('/featured', async (req, res) => {
    try {
        const query = `SELECT * FROM news
                        WHERE featured = TRUE
                        LIMIT 20;`
        
        const result = await req.pgClient.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching featured news data: ', error);
        res.status(500).json({ error: error.message });
    }
})

export default router;