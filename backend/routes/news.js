import express from 'express';
import { getAllNews, getFeaturedNews, deleteNews, getSpecificNews, editNews, createNews } from '../services/newsService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * News Related API Endpoints
 */
// 'All' news data
router.get('/', async (req, res) => {
    try {
        const result = await getAllNews(req.pgClient);
        res.json(result);
    } catch (error) {
        console.error('Error fetching news data: ', error);
        res.status(500).json({ error: error.message });
    }
})

// featured news data
router.get('/featured', async (req, res) => {
    try {
        const result = await getFeaturedNews(req.pgClient);
        res.json(result);
    } catch (error) {
        console.error('Error fetching featured news data: ', error);
        res.status(500).json({ error: error.message });
    }
})

// Specific news article
router.get('/:news_id', async (req, res) => {
    try {  
        const { news_id } = req.params;

        const result = await getSpecificNews(req.pgClient, news_id);
        res.json(result);
    } catch (error) {
        console.error('Error fetching specific news data: ', error);
        res.status(500).json({ error: error.message });
    }
})

/**
 * Protected Endpoints
 */
// Delete news post
router.delete('/:news_id', async(req, res) => {
    try {
        const { news_id } = req.params;

        // Check Authentication
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const { username } = req.user;
        console.log("In backend: ", username);

        await deleteNews(req.pgClient, news_id);
        res.status(201).json({ message: 'News successfully deleted'})
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ error: error.message });
    }
})

// Create news posts
router.post('/', authenticateToken, async (req, res) => {
    try {
        const newsData = req.body;

        console.log(newsData);

        // Check Authentication
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const { username } = req.user;
        console.log("In backend: ", username);

        const result = await createNews(req.pgClient, newsData);
        res.status(201).json({ message: 'Article Successfully Created' });
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ error: error.message });
    }
})

// Edit news post
router.put('/:news_id', authenticateToken, async (req, res) => {
    try {
        const newsData = req.body;

        console.log(newsData);

        // Check Authentication
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        
        const { username } = req.user;
        console.log("In backend: ", username);

        const result = await editNews(req.pgClient, newsData);
        res.status(201).json({ message: 'Article Successfully Updated' });
    } catch (error) {
        console.error('Error editing article:', error);
        res.status(500).json({ error: error.message });
    }
})

export default router;