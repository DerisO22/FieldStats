import express from 'express';
import { getAllSports, getSpecificSport, deleteSport} from '../services/sportService.js';

const router = express.Router();

/**
 * Sports Related API Endpoints
 */
// All Sports
router.get('/', async (req, res) => {
    try {
        const result = await getAllSports(req.pgClient);
        res.json(result);
    } catch (error) {
        console.error('Error fetching sports data:', error);
        res.status(500).json({ error: error.message });
    }
});

// Specific Sports
router.get('/:sportName', async(req, res) => {
    try {
        const { sportName } = req.params;
        const result = await getSpecificSport(req.pgClient, sportName);
        
        if(result.length === 0){
            res.status(404).json({ error: "Sport Not Found"});
        }

        res.json(result);
    } catch(error) {
        console.error('Error fetching sport data:', error);
        res.status(500).json({ error: error.message });
    }
})

router.delete('/:sportName', async(req, res) => {
    try {
        const {sportName} = req.params;
        await deleteSport(req.pgClient, sportName);
        
        res.status(201).json({ message: 'Sport successfully deleted'})
    } catch (error) {
        console.error('Error deleting sport:', error);
        res.status(500).json({ error: error.message });
    }
})

export default router;