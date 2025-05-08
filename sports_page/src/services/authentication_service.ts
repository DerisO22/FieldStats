// const url: string = "https://FieldStats.vercel.app/"
const API_URL: string = "http://localhost:3001"

interface AuthInfo {
    username: string;
    password: string;
    isSigningIn: boolean;
}

const login = async(userCredentials: AuthInfo) => {
    try {
        const res = await fetch(`${API_URL}/${!userCredentials.isSigningIn ? 'login' : 'signup'}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: userCredentials.username, password: userCredentials.password }),
            credentials: 'include', 
        });
        return res;
    } catch (error) {
        throw error;
    }
}

export { login };