import { SchoolQueries } from "../queries/school_service_queries.js";
/**
 *  School Related Services
 */
const getAllSchools = async(pgClient) => {
    try {
        const query = SchoolQueries.RETRIEVE_ALL;
        const result = await pgClient.query(query);

        return result.rows;
    } catch (error) {
        console.error('Service: Error fetching school data', error);
    }
};

const getSpecificSchool = async(pgClient, school_id) => {
    try {
        const query = SchoolQueries.RETRIEVE_SPECIFIC;
        const result = await pgClient.query(query, [school_id]);

        return result.rows[0];
    } catch (error) {
        console.error('Error fetching school data', error);
    }
};

const deleteSchool = async(pgClient, school_id) => {
    try {
        const query = SchoolQueries.DELETE;
        const result = await pgClient.query(query, [school_id]);

        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error Deleting school data', error);
    }
};

const createSchool = async(pgClient, school_data) => {
    try {
        const query = SchoolQueries.CREATE;
        const {school_name, school_type_id, state, city, address, website} = school_data;
        const result = await pgClient.query(query, [school_name, school_type_id, state, city, address, website]);

        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error editing school data', error);
    }
};

const editSchool = async(pgClient, school_data) => {
    try {
        const query = SchoolQueries.EDIT;
        const {school_id, school_name, school_type_id, state, city, address, website} = school_data;
        const result = await pgClient.query(query, [school_id, school_name, school_type_id, state, city, address, website]);

        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error editing school data', error);
    }
};

export { getAllSchools, getSpecificSchool, deleteSchool, createSchool, editSchool };