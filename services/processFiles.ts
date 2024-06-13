import axios from 'axios';

export const processFiles = async (fileIds: string[], userId: string) => {
    try {
        const data = {
            fileIds: fileIds,
            userId: userId
        };

        const response = await axios.post('https://uploadservice-juzqocjfea-uc.a.run.app/processFiles', data);
        // const response = await axios.post('http://192.168.1.69:8080/processFiles', data);

        if (response.status === 200) {
            console.log('Files processed successfully:', response.data);
        } else {
            console.error('Failed to process files:', response.statusText);
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
};