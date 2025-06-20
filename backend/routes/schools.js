import express from 'express';
import { getAllSchools, getSpecificSchool, deleteSchool, createSchool, editSchool, getSchoolSports } from '../services/schoolsService.js';
import { authenticateToken } from '../middleware/auth.js';

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
            return res.status(404).json({ error: "School Not Found"});
        }

        res.json(result);
    } catch (error) {
        console.error('Error fetching school data', error);
        res.status(500).json({ error: error.message});
    }
})


/**
 * ADMIN and Protected Endpoints
 */
// Delete School
router.delete('/:school_id', authenticateToken, async (req, res) => {
    try {
        const { school_id } = req.params;

        // Check Authentication
        if(!req.user) {
            return res.status(401).json({ error: "Authentication Required"})
        }
    
        await deleteSchool(req.pgClient, school_id);
        res.status(200).json({ message: 'School successfully deleted'})
    } catch (error) {
        console.error('Error Deleting school data', error);
        res.status(500).json({ error: error.message});
    }
});

// Create School
router.post('/', authenticateToken, async (req, res) => {
    try {
        const schoolData = req.body;

        console.log(schoolData);

        // Check Authentication
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        const { username } = req.user;
        console.log("In backend: ", username);

        const result = await createSchool(req.pgClient, schoolData);
        res.status(201).json({ message: 'School Successfully Created' });
    } catch (error) {
        console.error('Error creating school:', error);
        res.status(500).json({ error: error.message });
    }
})

// Edit School Info
router.put('/:school_id', authenticateToken, async (req, res) => {
    try {
        const schoolData = req.body;
        console.log(schoolData);

        // Check Authentication
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        const { username } = req.user;
        console.log("In backend: ", username);

        const result = await editSchool(req.pgClient, schoolData);
        res.status(200).json({ message: 'School Successfully Updated' });
    } catch (error) {
        console.error('Error editing school:', error);
        res.status(500).json({ error: error.message });
    }
})

/**
 * Endpoints For Advanced Queries
 */
// Get all sports a school has
router.get('/sports/:school_id', async(req, res) => {
    try {
        const { school_id } = req.params;

        const result = await getSchoolSports(req.pgClient, school_id);

        // if(result.length === 0){
        //     res.status(404).json({ error: "School has no sports"});
        // }

        res.json(result);
    } catch (error) {
        console.error('Error fetching schools sport data', error);
        res.status(500).json({ error: error.message});
    }
})

export default router;