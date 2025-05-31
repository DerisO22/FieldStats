// const API_URL: string = (import.meta.env.NODE_ENVIRONMENT === "production") ? 
//     "https://FieldStats.vercel.app" :
//     "http://localhost:3001";
const API_URL = "http://localhost:3001";

const getAllNews = async () => {
    try {
        const res = await fetch(`${API_URL}/news_data`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        });
        
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error (${res.status}): ${errorText || 'Unknown error'}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in getAllArticles service:', error);
        throw error; 
    }
}

const getFeaturedNews = async () => {
    try {
        const res = await fetch(`${API_URL}/news_data/featured`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        });
        
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error (${res.status}): ${errorText || 'Unknown error'}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in getFeaturedNews service:', error);
        throw error; 
    }
}

const getSpecificNews = async (news_id: string) => {
    try {
        const res = await fetch(`${API_URL}/news_data/${news_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error (${res.status}): ${errorText || 'Unknown error'}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in getSpecificNews service:', error);
        throw error; 
    }

}

export { getAllNews, getFeaturedNews, getSpecificNews };