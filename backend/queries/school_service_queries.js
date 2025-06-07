const SchoolQueries = {
    RETRIEVE_ALL: `SELECT * FROM schools LIMIT 200;`,

    RETRIEVE_SPECIFIC: 'SELECT * FROM schools WHERE school_id = $1',

    DELETE: 'DELETE FROM schools WHERE school_id = $1;',

    EDIT: `UPDATE schools SET school_name = $2, school_type_id = $3, state = $4, city = $5, address = $6, website = $7
           WHERE school_id = $1`,

    CREATE: `INSERT INTO schools (school_name, school_type_id, state, city, address, website)
             VALUES ($1, $2, $3, $4, $5, $6)`,

	// Filtering for location menu
	RETRIEVE_SCHOOL_LOCATIONS: `SELECT state, city
								FROM schools;`,

	RETRIEVE_BY_LOCATION: `SELECT * FROM schools
						   WHERE state=$1 AND city=$2`,
	
	// school, team, and player related queries
	// Still need to add data for the junctions between school, teams, and players
	RETRIEVE_SCHOOL_TEAMS: `SELECT *
							FROM teams t 
							JOIN schools s ON t.school_id = s.school_id
							WHERE s.school_id = $1;`,

	RETRIEVE_SCHOOL_SPORTS: `SELECT s.sport_id, s.sport_name
							 FROM sports s
							 JOIN school_sports ss ON s.sport_id = ss.sport_id
							 WHERE ss.school_id = $1;`
};

export { SchoolQueries };