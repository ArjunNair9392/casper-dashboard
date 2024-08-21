import axios from 'axios';

export const deleteFile = async (file_id: string, user_email: string, channel_name: string) => {
    try {
        const data = {
            file_id: file_id,
            channel_name: channel_name,
            user_email: user_email
        };

        const response = await axios.post('https://uploadservice-2imgap5w2q-uc.a.run.app/delete-file', data);
        if (response.status === 200) {
            console.log('Files processed successfully:', response.data);
        } else {
            console.error('Failed to process files:', response.statusText);
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
};
