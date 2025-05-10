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

export { getSports, getSportDetails };