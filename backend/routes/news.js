import express from 'express';
import { getAllNews, getFeaturedNews, deleteNews } from '../services/newsService.js';

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

router.delete('/:news_id', async(req, res) => {
    try {
        const { news_id } = req.params;

        await deleteNews(req.pgClient, news_id);
        res.status(201).json({ message: 'News successfully deleted'})
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ error: error.message });
    }
})

export default router;