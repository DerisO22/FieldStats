// const API_URL: string = (import.meta.env.NODE_ENVIRONMENT === "production") ? 
//     "https://FieldStats.vercel.app" :
//     "http://localhost:3001";
const API_URL = "http://localhost:3001";

interface EditPlayerData {
    player_id: number,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    gender_id: number,
    bio: string
}

interface CreatePlayerData {
    first_name: string,
    last_name: string,
    date_of_birth: string,
    gender_id: number,
    bio: string
}

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

const deletePlayer = async(player_id: number) => {
    try {
        const res = await fetch(`${API_URL}/players_data/${player_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error (${res.status}): ${errorText || 'Unknown error'}`);
        }
        
        const data = await res.json();
        return data;
    } catch(error) {
        console.error('Error in getSports service:', error);
        throw error; 
    }
}

const addPlayer = async(player_data: CreatePlayerData) => {
    try {
        const res = await fetch(`${API_URL}/players_data`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(player_data)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`API error (${res.status}): ${errorData.error || 'Unknown error'}`);
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in addPlayer service:', error);
        throw error; 
    }
}

const editPlayer = async(player_data: EditPlayerData) => {
    try {
        const res = await fetch(`${API_URL}/players_data/${player_data.player_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(player_data)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`API error (${res.status}): ${errorData.error || 'Unknown error'}`);
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in editPlayer service:', error);
        throw error; 
    }
}

export { getPlayers, getPlayerDetails, deletePlayer, addPlayer, editPlayer };