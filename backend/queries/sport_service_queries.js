const SportQuerys = {
    RETRIEVE_ALL: 'SELECT * FROM sports;',

    RETRIEVE_SPECIFIC: 'SELECT * FROM sports WHERE LOWER(sport_name) = LOWER($1);',

    DELETE: 'DELETE FROM sports WHERE LOWER(sport_name) = LOWER($1) RETURNING *;',

    EDIT: `UPDATE sports SET sport_description = $2, has_gender_divisions = $3
           WHERE sport_name = $1`,

    CREATE: `INSERT INTO sports (sport_name, sport_description, has_gender_divisions) 
             VALUES ($1, $2, $3);`,

    RETRIEVE_SPORT_GENDERS: `SELECT sg.sport_id, sg.gender_id, g.gender 
                             FROM sport_genders sg
                             JOIN genders g ON sg.gender_id = g.gender_id`,

	// Probably in the detail pages of sports
    RETRIEVE_NEWS_BY_SPORT: `SELECT * 
							 FROM news n
							 JOIN sports s ON n.sport_id = s.sport_id
							 WHERE s.sport_id = $1;`
	
}

export { SportQuerys };