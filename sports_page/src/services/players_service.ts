// const API_URL: string = (import.meta.env.NODE_ENVIRONMENT === "production") ? 
//     "https://FieldStats.vercel.app" :
//     "http://localhost:3001";
const API_URL = "http://localhost:3001";

const getPlayers = async () => {
    try {
        const res = await fetch(`${API_URL}/players_data`, {
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
        console.error('Error in getSports service:', error);
        throw error; 
    }
}

const getPlayerDetails = async (player_id: string) => {
    try {
        const res = await fetch(`${API_URL}/players_data/player_profile/${player_id}`, {
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
        console.error('Error in getSports service:', error);
        throw error; 
    }
}

// const getPlayerStats = async ()

export { getPlayers, getPlayerDetails };