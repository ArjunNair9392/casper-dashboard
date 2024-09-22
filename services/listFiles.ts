import axios from './axiosConfig';

export const getListFiles = async (user_email: string) => {
    try {
        const response = await axios.get(`https://uploadservice-2imgap5w2q-uc.a.run.app/list-files-from-gdrive?user_email=${user_email}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching channels:', error);
        throw error;
    }
};