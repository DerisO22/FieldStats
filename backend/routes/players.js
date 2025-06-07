import express from 'express';
import { getAllPlayers, getSpecificPlayer, deletePlayer, createPlayer, editPlayer } from '../services/playersService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * Player Related API Endpoints
 */
// Pretty sure their's 2000 players so don't load all of them
router.get('/', async (req, res) => {
    try {
        const result = await getAllPlayers(req.pgClient)
        res.json(result);
    } catch (error) {
        console.error('Error fetching players data:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get individual player details and their stats
router.get('/player_profile/:player_id', async (req, res) => {
    try {
        const { player_id } = req.params;
        const result = await getSpecificPlayer(req.pgClient, player_id);

        if(result.length === 0){
            res.status(404).json({ error: "Player Not Found"});
        }

        res.json(result);
    } catch (error) {
        console.error('Error fetching player data:', error);
        res.status(500).json({ error: error.message });
    }
})

router.delete('/:player_id', authenticateToken, async(req, res) => {
    try {
        const { player_id } = req.params;

        if(!req.user) {
            return res.status(401).json({ error: "Authentication Required"})
        }

        await deletePlayer(req.pgClient, player_id)
        res.status(201).json({ message: 'Player successfully deleted'})
    } catch (error) {
        console.error('Error deleting player:', error);
        res.status(500).json({ error: error.message });
    }
})

router.post('/', authenticateToken, async(req, res) => {
    try {
        const player_data = req.body;

        if(!req.user) {
            return res.status(401).json({ error: "Authentication Required"});
        }

        const result = createPlayer(req.pgClient, player_data);
        res.status(201).json({ message: "Player successfully added"});
    } catch(error) {
        console.error('Error adding player:', error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/:player_id', authenticateToken, async(req, res) => {
    try {
        const player_data = req.body;

        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        const { username } = req.user;
        console.log("In backend: ", username);

        const result = await editPlayer(req.pgClient, player_data);
        res.status(200).json({ message: 'Player details Successfully Updated' });
    } catch(error) {
        console.error('Error editing player details:', error);
        res.status(500).json({ error: error.message });
    }
})

export default router;