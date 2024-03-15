import axios, { AxiosResponse } from 'axios';
interface SignUpData {
    name: string;
    email: string;
    password: string;
}
interface LoginData {
    email: string;
    password: string;
}
interface Header{
    url: string,
    method: string,
    token: string | null,
    data: any |null
}
const API_URL = 'http://localhost:3000/auth';
export const signUp = async (userData: SignUpData): Promise<string> => {
    try {
        const response: AxiosResponse<{ token: string }> = await axios.post(`${API_URL}/signup`, userData);
        return response.data.token;
    } catch (error) {
        throw error;
    }
};
export const login = async (userData: LoginData): Promise<string> => {
    try {
        const response: AxiosResponse<{ token: string }> = await axios.post(`${API_URL}/login`, userData);
        return response.data.token;
    } catch (error) {
        throw error;
    }
};

