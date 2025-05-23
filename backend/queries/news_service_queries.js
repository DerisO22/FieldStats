const NewsQueries = {
    RETRIEVE_ALL: 'SELECT * FROM news;',

    RETRIEVE_FEATURED: `SELECT * FROM news
                       WHERE featured = TRUE
                       LIMIT 20;`,

    RETRIEVE_SPECIFIC: `SELECT * FROM news
                        WHERE news_id = $1;`,

    DELETE: `DELETE FROM news WHERE news_id = $1;`,

    EDIT: `UPDATE news 
           SET headline = $1, author = $2, publish_date = $3, content = $4, image_url = $5, sport_id = $6, team_id = $7, featured = $8 
           WHERE news_id = $9;`,

    CREATE: `INSERT INTO news (headline, author, publish_date, content, image_url, sport_id, team_id, featured) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
};

export { NewsQueries };