const SportQuerys = {
    RETRIEVE_ALL: 'SELECT * FROM sports;',

    RETRIEVE_SPECIFIC: 'SELECT * FROM sports WHERE LOWER(sport_name) = LOWER($1);',

    DELETE: 'DELETE FROM sports WHERE LOWER(sport_name) = LOWER($1);',

    EDIT: `UPDATE sports SET sport_description = $1, has_gender_divisions = $2
           WHERE sport_name = $3`,

    CREATE: `INSERT INTO sports (sport_name, sport_description, has_gender_divisions) 
             VALUES ($1, $2, $3);`
}

export { SportQuerys };