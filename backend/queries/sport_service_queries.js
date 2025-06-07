const SportQuerys = {
    RETRIEVE_ALL: 'SELECT * FROM sports;',

    RETRIEVE_SPECIFIC: 'SELECT * FROM sports WHERE LOWER(sport_name) = LOWER($1);',

    DELETE: 'DELETE FROM sports WHERE LOWER(sport_name) = LOWER($1) RETURNING *;',

    EDIT: `UPDATE sports SET sport_description = $2, has_gender_divisions = $3
           WHERE sport_name = $1`,

    CREATE: `INSERT INTO sports (sport_name, sport_description, has_gender_divisions) 
             VALUES ($1, $2, $3);`,

	// Probably in the detail pages of sports
    RETRIEVE_NEWS_BY_SPORT: `SELECT * 
							 FROM news n
							 JOIN sports s ON n.sport_id = s.sport_id
							 WHERE s.sport_id = $1;`
	
}

export { SportQuerys };