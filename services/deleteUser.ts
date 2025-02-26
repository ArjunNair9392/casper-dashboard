import axios from 'axios';

export const deleteFile = async ( userId: string) => {
    try {
        const data = {
            userId: userId
        };

        const response = await axios.post('https://uploadservice-juzqocjfea-uc.a.run.app/deleteUser', data);
        // const response = await axios.post('http://192.168.1.69:8080/deleteFile', data);
        console.log('Files going to be deleted successfully:', data)

        if (response.status === 200) {
            console.log('Files processed successfully:', response.data);
        } else {
            console.error('Failed to process files:', response.statusText);
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
};
