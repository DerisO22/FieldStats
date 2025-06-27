// const API_URL: string = (import.meta.env.NODE_ENVIRONMENT === "production") ? 
//     "https://FieldStats.vercel.app" :
//     "http://localhost:3001";
const API_URL = "http://localhost:3001";

const getSports = async () => {
    try {
        const res = await fetch(`${API_URL}/sports_data`, {
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

const getSportGenders = async () => {
    try {
        const res = await fetch(`${API_URL}/sports_data/genders`, {
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
        console.error('Error in getSportGenders service:', error);
        throw error; 
    }
}

const getSportDetails = async (sportName: string) => {
    try {
        const res = await fetch(`${API_URL}/sports_data/${sportName}`, {
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

const deleteSport = async (sportName: string) => {
    try {
        const res = await fetch(`${API_URL}/sports_data/${sportName}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: 'include', 
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`API error (${res.status}): ${errorData.error || 'Unknown error'}`);
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in deleteSport service:', error);
        throw error; 
    }
}

const addSport = async ( sportData: {
    sport_name: string,
    sport_description: string,
    has_gender_division: boolean
} ) => {
    try {
        const res = await fetch(`${API_URL}/sports_data`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(sportData)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`API error (${res.status}): ${errorData.error || 'Unknown error'}`);
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in addSport service:', error);
        throw error; 
    }
}

const editSport = async ( sportData: {
    sport_name: string,
    sport_description: string,
    has_gender_division: boolean
} ) => {
    try {
        const res = await fetch(`${API_URL}/sports_data/${sportData.sport_name}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(sportData)
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`API error (${res.status}): ${errorData.error || 'Unknown error'}`);
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in editSport service:', error);
        throw error; 
    }
}

export { getSports, getSportGenders, getSportDetails, deleteSport, addSport, editSport };