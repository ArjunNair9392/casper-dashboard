import axios from 'axios';

export const connectGDrive = async (code: string, user_email: string) => {
    try {
        const data = {
            code: code,
            user_email: user_email
        };

        const response = await axios.post('https://registrationservice-980105735955.us-central1.run.app/connect-gdrive', data);
        if (response.status === 200) {
            console.log('GDrive connected successfully:', response.data);
        } else {
            console.error('Failed to connect to Gdrive:', response.statusText);
        }
        return response;
    } catch (error) {
        console.error('Error connecting to Gdrive:', error);
    }
};
