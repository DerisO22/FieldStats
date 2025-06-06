// const API_URL: string = (import.meta.env.NODE_ENVIRONMENT === "production") ? 
//     "https://FieldStats.vercel.app" :
//     "http://localhost:3001";
const API_URL = "http://localhost:3001";

const getSchools = async () => {
    try {
        const res = await fetch(`${API_URL}/schools_data`, {
            method: "GET",
            headers: { "Content-Type": "Application/json"},
            credentials: 'include'
        })

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error (${res.status}): ${errorText || 'Unknown error'}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in getSchools service:', error);
        throw error; 
    }
}

const getSchoolDetails = async (school_id: string) => {
    try {
        const res = await fetch(`${API_URL}/schools_data/${school_id}`, {
            method: "GET",
            headers: { "Content-Type": "Application/json"},
            credentials: 'include'
        })

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error (${res.status}): ${errorText || 'Unknown error'}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in getSchoolDetails service:', error);
        throw error; 
    }
}

const deleteSchool = async (school_id: number) => {
    try {
        const res = await fetch(`${API_URL}/schools_data/${school_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "Application/json"},
            credentials: 'include'
        })

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error (${res.status}): ${errorText || 'Unknown error'}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in createSchool service:', error);
        throw error; 
    }
}

const createSchool = async (schoolData: {
    school_name: string,
    school_type_id: number, 
    state: string, 
    city: string, 
    address: string, 
    website: string
}) => {
    try {
        const res = await fetch(`${API_URL}/schools_data/`, {
            method: "POST",
            headers: { "Content-Type": "Application/json"},
            credentials: 'include',
            body: JSON.stringify(schoolData)
        })

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error (${res.status}): ${errorText || 'Unknown error'}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in createSchool service:', error);
        throw error; 
    }
}

const editSchool = async (schoolData: {
    school_id: number,
    school_name: string,
    school_type_id: number, 
    state: string, 
    city: string, 
    address: string, 
    website: string
}) => {
    try {
        const res = await fetch(`${API_URL}/schools_data/${schoolData.school_id}`, {
            method: "PUT",
            headers: { "Content-Type": "Application/json"},
            credentials: 'include',
            body: JSON.stringify(schoolData)
        })

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error (${res.status}): ${errorText || 'Unknown error'}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in createSchool service:', error);
        throw error; 
    }
}

export { getSchools, getSchoolDetails, deleteSchool, editSchool, createSchool };