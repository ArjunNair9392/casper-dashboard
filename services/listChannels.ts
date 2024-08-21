import axios from './axiosConfig';

export const listChannelsForUser = async (user_email: string) => {
    try {
        const response = await axios.get(`https://registrationservice-2imgap5w2q-uc.a.run.app/list-channels-for-user?user_email=${user_email}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching channels:', error);
        throw error;
    }
};