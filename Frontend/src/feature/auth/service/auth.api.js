import axios from 'axios';

const authApiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api/auth',
    withCredentials: true,
});

export async function registerUser({firstName, lastName, email, password, contact}) {
    try {
        const response = await authApiInstance.post('/register', { firstName, lastName, email, password, contact });
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}

export async function loginUser({ email, password }) {
    try{
        const response = await authApiInstance.post('/login', { email, password });
        return response.data;

    }catch(error){
        console.error('Login failed:', error);
    }
}












export async function loginWithGoogle() {
    try {
        const response = await authApiInstance.get('/google');
        return response.data; // Return user data or relevant info
    } catch (error) {
        console.error('Google login failed:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}