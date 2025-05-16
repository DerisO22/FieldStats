import express from 'express';
const router = express.Router();

/**
 * Sports Related API Endpoints
 */
// All Sports
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM sports;';
        const result = await req.pgClient.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching sports data:', error);
        res.status(500).json({ error: error.message });
    }
});

// Specific Sports
router.get('/:sportName', async(req, res) => {
    try {
        const { sportName } = req.params;
        console.log(sportName)
        const query = 'SELECT * FROM sports WHERE LOWER(sport_name) = LOWER($1);';
        const result = await req.pgClient.query(query, [sportName]);
        
        if(result.rows.length === 0){
            res.status(404).json({ error: "Sport Not Found"});
        }

        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch(error) {
        console.error('Error fetching sports data:', error);
        res.status(500).json({ error: error.message });
    }
})

export default router;