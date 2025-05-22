import express from 'express';
import { getAllSchools, getSpecificSchool, deleteSchool } from '../services/schoolsService.js';

const router = express.Router();

/**
 * School Related API Endpoints
 */
// Get all of em
router.get('/', async (req, res) => {
    try {
        const result = await getAllSchools(req.pgClient);
        res.json(result);
    } catch (error) {
        console.error('Error fetching school data', error);
        res.status(500).json({ error: error.message});
    }
})

// Get individual Schools
router.get('/:school_id', async (req, res) => {
    try {
        const { school_id } = req.params;

        const result = await getSpecificSchool(req.pgClient, school_id);

        if(result.length === 0){
            res.status(404).json({ error: "School Not Found"});
        }

        res.json(result);
    } catch (error) {
        console.error('Error fetching school data', error);
        res.status(500).json({ error: error.message});
    }
})

router.delete('/:school_id', async (req, res) => {
    try {
        const { school_id } = req.params;
    
        await await deleteSchool(req.pgClient, school_id);
        res.status(201).json({ message: 'School successfully deleted'})
    } catch (error) {
        console.error('Error Deleting school data', error);
        res.status(500).json({ error: error.message});
    }
});

export default router;