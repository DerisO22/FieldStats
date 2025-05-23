import { SportQuerys } from "../queries/sport_service_queries.js";
/**
 * Sports Related Services
 */
const getAllSports = async(pgClient) => {
    try {
        const query = SportQuerys.RETRIEVE_ALL;
        const result = await pgClient.query(query);

        return result.rows;
    } catch (error) {
        console.error('Service: Error fetching all sports:', error);
    } 
};

const getSpecificSport = async(pgClient, sportName) => {
    try {
        const query = SportQuerys.RETRIEVE_SPECIFIC;
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
        const query = SportQuerys.DELETE;
        const result = await pgClient.query(query, [sportName]);

        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error deleting sport:', error);
    }
}

const createSport = async(pgClient, sportData) => {
    try {
        const query = SportQuerys.CREATE;
        const result = await pgClient.query(query, [ ...sportData ]);

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error deleting sport:', error);
    }
};

const editSport = async(pgClient, sportData) => {
    try {
        const query = SportQuerys.EDIT;
        const result = await pgClient.query(query, [ ...sportData ]);

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error deleting sport:', error);
    }
};

export {getAllSports, getSpecificSport, deleteSport};