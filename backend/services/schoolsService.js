const getAllSchools = async(pgClient) => {
    try {
        const query = `SELECT * FROM schools LIMIT 200;`;
        const result = await pgClient.query(query);

        return result.rows;
    } catch (error) {
        console.error('Service: Error fetching school data', error);
    }
};

const getSpecificSchool = async(pgClient, school_id) => {
    try {
        const query = 'SELECT * FROM schools WHERE school_id = $1';
        const result = await pgClient.query(query, [school_id]);

        return result.rows[0];
    } catch (error) {
        console.error('Error fetching school data', error);
    }
};

const deleteSchool = async(pgClient, school_id) => {
    try {
        const query = 'DELETE FROM schools WHERE school_id = $1;';
        const result = await pgClient.query(query, school_id);

        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error Deleting school data', error);
    }
};

export { getAllSchools, getSpecificSchool, deleteSchool };