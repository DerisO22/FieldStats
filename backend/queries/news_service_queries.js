const NewsQueries = {
    RETRIEVE_ALL: 'SELECT * FROM news;',

    RETRIEVE_FEATURED: `SELECT * FROM news
                       WHERE featured = TRUE
                       LIMIT 20;`,

    RETRIEVE_SPECIFIC: `SELECT * FROM news
                        WHERE news_id = $1;`,

    DELETE: `DELETE FROM news WHERE news_id = $1;`,

    EDIT: `UPDATE news 
           SET headline = $2, author = $3, publish_date = $4, content = $5, image_url = $6, sport_id = $7, team_id = $8, featured = $9
           WHERE news_id = $1;`,

    CREATE: `INSERT INTO news (headline, author, publish_date, content, image_url, sport_id, team_id, featured) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,

	// Probably will have some sort of filtering menu that get 20 articles from the selected sport
    RETRIEVE_SPORT_SPECIFIC: `SELECT *
							  FROM news n
							  JOIN sports s ON n.sport_id = s.sport_id
							  WHERE s.sport_name = $1
							  LIMIT 20;`,
	
	RETRIEVE_MOST_RECENT: `SELECT *
						   FROM news 
						   ORDER BY publish_date DESC
						   LIMIT 20;`
	
};

export { NewsQueries };