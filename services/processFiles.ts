import axios from 'axios';

export const processFiles = async (fileIds: string[], companyId: string, userId: string) => {
    try {
        const data = {
            fileIds: fileIds,
            companyId: companyId,
            userId: userId
        };

        const response = await axios.post('https://uploadservice-juzqocjfea-uc.a.run.app/processFiles', data);

        if (response.status === 200) {
            console.log('Files processed successfully:', response.data);
        } else {
            console.error('Failed to process files:', response.statusText);
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
};
