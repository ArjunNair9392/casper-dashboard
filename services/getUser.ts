import axios from './axiosConfig';

export const getUser = async (user_email: string) => {
    try {
        const response = await axios.get(`https://registrationservice-980105735955.us-central1.run.app/get-user?user_email=${user_email}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching channels:', error);
        throw error;
    }
};
