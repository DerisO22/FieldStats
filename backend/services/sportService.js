/**
 * Sports Related Services
 */
const getAllSports = async(pgClient) => {
    try {
        const query = 'SELECT * FROM sports;';
        const result = await pgClient.query(query);

        return result.rows;
    } catch (error) {
        console.error('Service: Error fetching all sports:', error);
    } 
};

const getSpecificSport = async(pgClient, sportName) => {
    try {
        const query = 'SELECT * FROM sports WHERE LOWER(sport_name) = LOWER($1);';
        const result = await pgClient.query(query, [sportName]);
        
        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error fetching specific sport:', error);
    }
};  

const deleteSport = async(pgClient, sportName) => {
    try {
        const query = `DELETE FROM sports WHERE LOWER(sport_name) = LOWER($1);`;
        const result = await pgClient.query(query, [sportName]);

        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error deleting sport:', error);
    }
}

// const createSport = async(pgClient, sportName) => {

// }

export {getAllSports, getSpecificSport, deleteSport};