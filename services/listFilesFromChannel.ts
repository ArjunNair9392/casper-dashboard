import axios from './axiosConfig';

export const listFilesFromChannel = async (user_email: string, channel_name: string) => {
    try {
        const response = await axios.get(`https://registrationservice-2imgap5w2q-uc.a.run.app/list-files-from-channel?user_email=${user_email}&channel_name=${channel_name}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching channels:', error);
        throw error;
    }
};