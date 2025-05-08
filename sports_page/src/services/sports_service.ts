const API_URL: string = import.meta.env.NODE_ENVIRONMENT ? 
    "https://FieldStats.vercel.app" :
    "http://localhost:3001";

const getSports = async () => {
    try {
        const res = await fetch(`${API_URL}/sports_data`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        });
        
        // Check if the response is successful
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error (${res.status}): ${errorText || 'Unknown error'}`);
        }
        
        // Parse and return the data directly
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in getSports service:', error);
        throw error; // Re-throw for component handling
    }
}

export { getSports };