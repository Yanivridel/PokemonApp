import axios from 'axios';

const API_URL = 'http://localhost:3000';


export const checkLogin = async ({email, password}) => {
    try {
        const { data } = await axios.post(`${API_URL}/api/users/login`, { email, password });
        return data;
    } 
    catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const createUser = async ({email, username, password}) => {
    try {
        const { data } = await axios.post(`${API_URL}/api/users/signup`, { email, username, password });
        return data;
    } 
    catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

// Function to check user authentication
export const getSelf = async (token) => {
    try {
        const { data } = await axios.get(`${API_URL}/api/users/get-self`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        console.error('Auth check error:', error);
        throw error;
    }
};

export const changeUsername = async (email, username) => {
    try {
        const { data } = await axios.post(`${API_URL}/api/users/change/username`, {
            email,
            username,
        });
        return data;
    } catch (error) {
        console.error('Failed changing username:', error);
        throw error;
    }
}
