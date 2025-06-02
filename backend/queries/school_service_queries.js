const SchoolQueries = {
    RETRIEVE_ALL: `SELECT * FROM schools LIMIT 200;`,

    RETRIEVE_SPECIFIC: 'SELECT * FROM schools WHERE school_id = $1',

    DELETE: 'DELETE FROM schools WHERE school_id = $1;',

    EDIT: `UPDATE schools SET school_name = $2, school_type_id = $3, state = $4, city = $5, address = $6, website = $7
           WHERE school_id = $1`,

    CREATE: `INSERT INTO schools (school_name, school_type_id, state, city, address, website)
             VALUES ($1, $2, $3, $4, $5, $6)`
};

export { SchoolQueries };