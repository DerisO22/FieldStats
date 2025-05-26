import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { deleteContentLimiter } from '../middleware/rate_limiter.js';
import { getAllSports, getSpecificSport, deleteSport, createSport, editSport } from '../services/sportService.js';

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

// Delete a Sport (ADMINS Only)
router.delete('/:sportName', authenticateToken, async(req, res) => {
    try {
        const { sportName } = req.params;

        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        const { username } = req.user;
        console.log("In backend: ", username);
        
        if (username !== process.env.ADMIN_USERNAME) {
            return res.status(403).json({ error: 'Unauthorized. Only ADMINs can delete sports.' });
        }

        const result = await deleteSport(req.pgClient, sportName);
        
        res.status(201).json({ message: 'Sport successfully deleted'})
    } catch (error) {
        console.error('Error deleting sport:', error);
        res.status(500).json({ error: error.message });
    }
})

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { sportData } = req.params;

        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        const { username } = req.user;
        console.log("In backend: ", username);

        const result = await createSport(req.pgClient, sportData);
        res.status(201).json({ message: 'Sport Successfully Created' });
    } catch (error) {
        console.error('Error creating sport:', error);
        res.status(500).json({ error: error.message });
    }
})

router.put('/:sportName', authenticateToken, async (req, res) => {
    try {
        const { sportData } = req.params;

        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        const { username } = req.user;
        console.log("In backend: ", username);

        const result = await editSport(req.pgClient, sportData);
        res.status(201).json({ message: 'Sport Successfully Updated' });
    } catch (error) {
        console.error('Error editing sport:', error);
        res.status(500).json({ error: error.message });
    }
})

export default router;