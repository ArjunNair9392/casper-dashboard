import axios from './axiosConfig';

export const addChannel = async (channel_name: string, userId: string) => {
    try {
        const data = {
            "channel_name": channel_name ? channel_name : "general",
            "admin_email": userId ? userId : "amitodshi4@gmail.com"
        };

        const response = await axios.post('https://registrationservice-2imgap5w2q-uc.a.run.app/add-channel', data);

        return response.data;
    } catch (error) {
        console.error('Error processing files:', error);
    }
};