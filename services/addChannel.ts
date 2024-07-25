import axios from './axiosConfig';

export const addChannel = async (company_name: string, channel_name: string, userId: string) => {
    try {
        const data = {
            "company_name": company_name ? company_name : "casper",
            "channel_name": channel_name ? channel_name : "general",
            "admin_email": userId ? userId : "amitodshi4@gmail.com"
        };

        const response = await axios.post('https://uploadservice-2imgap5w2q-uc.a.run.app/addChannel', data);

        if (response.status === 200) {
            console.log('added channel successfully:', response.data);
        } else {
            console.error('Failed to process files:', response.statusText);
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
};