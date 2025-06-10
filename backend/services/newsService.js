import { NewsQueries } from "../queries/news_service_queries.js";
/**
 * News Related Services
 */
const getAllNews = async(pgClient) => {
    try {
        const query = NewsQueries.RETRIEVE_ALL;
        const result = await pgClient.query(query);

        return result.rows;
    } catch (error) {
        console.error('Service: Error fetching news data: ', error);
    }
};

const getFeaturedNews = async(pgClient) => {
    try {
        const query = NewsQueries.RETRIEVE_FEATURED;
        const result = await pgClient.query(query);

        return result.rows;
    } catch (error) {
        console.error('Service: Error fetching featured news data: ', error);
    }
};

const getSpecificNews = async(pgClient, news_id) => {
    try {
        const query = NewsQueries.RETRIEVE_SPECIFIC;
        const result = await pgClient.query(query, [news_id]);

        return result.rows[0];
    } catch (error) {
        console.error("Service: Error fetching specific article: ", error);
    }
}

/**
 * Protected Services
 */
const deleteNews = async(pgClient, news_id) => {
    try {
        const query = NewsQueries.DELETE;
        const result = await pgClient.query(query, [news_id]);

        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error deleting news:', error);
    }
};

const createNews = async(pgClient, news_data) => {
    try {
        const query = NewsQueries.CREATE;
        const { headline, author, publish_date, content, image_url, sport_id, team_id, features } = news_data;
        const result = await pgClient.query(query, [headline, author, publish_date, content, image_url, sport_id, team_id, features]);

        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error creating news:', error);
    }
};

const editNews = async(pgClient, news_data) => {
    try {
        const query = NewsQueries.EDIT;
        const { news_id, headline, author, publish_date, content, image_url, sport_id, team_id, features } = news_data;

        const result = await pgClient.query(query, [news_id, headline, author, publish_date, content, image_url, sport_id, team_id, features]);

        if (result.rows.length === 0){
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Service: Error editing news:', error);
    }
};

export { getAllNews, getFeaturedNews, deleteNews, getSpecificNews, createNews, editNews };