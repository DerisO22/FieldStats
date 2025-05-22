const getAllNews = async(pgClient) => {
    try {
        const query = `SELECT * FROM news LIMIT 100;`;
        const result = await pgClient.query(query);

        return result.rows;
    } catch (error) {
        console.error('Error fetching news data: ', error);
    }
};

const getFeaturedNews = async(pgClient) => {
    try {
        const query = `SELECT * FROM news
                       WHERE featured = TRUE
                       LIMIT 20;`
        const result = await pgClient.query(query);

        return result.rows;
    } catch (error) {
        console.error('Error fetching featured news data: ', error);
    }
};

const deleteNews = async(pgClient, news_id) => {
    try {
        const query = `DELETE FROM news WHERE news_id = $1;`;
        const result = await pgClient.query(query, [news_id]);

        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Error deleting news:', error);
    }
};

export { getAllNews, getFeaturedNews, deleteNews };