import { PlayerQueries } from "../queries/player_service_queries.js";
/**
 *  Player Related Services
 */
const getAllPlayers = async(pgClient) => {
    try {
        const query = PlayerQueries.RETRIEVE_ALL;
        const result = await pgClient.query(query);

        return result.rows;
    } catch (error) {
        console.error('Service: Error fetching players data:', error);
    }
};

const getSpecificPlayer = async(pgClient, player_id) => {
    try {
        const query = PlayerQueries.RETRIEVE_SPECIFIC;

        const result = await pgClient.query(query, [player_id]);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error fetching player data:', error);
    }
};

const deletePlayer = async(pgClient, player_id) => {
    try {
        const query = PlayerQueries.DELETE;
        const result = await pgClient.query(query, [player_id])
        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error deleting player:', error);
    }
};

const createPlayer = async(pgClient, player_data) => {
    try {
        const query = PlayerQueries.CREATE;
        const { player_id, first_name, last_name, date_of_birth, gender_id, bio } = player_data;
        const result = await pgClient.query(query, [player_id, first_name, last_name, date_of_birth, gender_id, bio])
        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error creating player:', error);
    }
};

const editPlayer = async(pgClient, player_data) => {
    try {
        const query = PlayerQueries.EDIT;
        const { player_id, first_name, last_name, date_of_birth, gender_id, bio } = player_data;
        const result = await pgClient.query(query, [player_id, first_name, last_name, date_of_birth, gender_id, bio])
        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error editing player:', error);
    }
};

export { getAllPlayers, getSpecificPlayer, deletePlayer, createPlayer, editPlayer };