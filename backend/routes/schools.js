import express from 'express';
const router = express.Router();

/**
 * School Related API Endpoints
 */
router.get('/', async (req, res) => {
    try {
        const query = `SELECT * FROM schools
                        LIMIT 200;`
        
        const result = await req.pgClient.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching school data', error);
        res.status(500).json({ error: error.message});
    }
})

router.get('/:school_id', async (req, res) => {
    try {
        const { school_id } = req.params;
        const query = 'SELECT * FROM schools WHERE school_id = $1';

        const result = await req.pgClient.query(query, [school_id])

        if(result.rows.length === 0){
            res.status(404).json({ error: "School Not Found"});
        }

        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching school data', error);
        res.status(500).json({ error: error.message});
    }
})

export default router;