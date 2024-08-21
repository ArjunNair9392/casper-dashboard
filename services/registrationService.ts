import axios from './axiosConfig';

interface CompanyFormData {
    company: string;
    address: string;
    city: string;
    state: string;
    country?: string;
    phone_number: string;
    admin_email: string;
}

export const registerCompany = async (formData: CompanyFormData) => {
    try {
        const response = await axios.post('https://registrationservice-2imgap5w2q-uc.a.run.app/company-registration', formData);
        console.log(response);
        if (response.status !== 200 || response.data.status !== 'success') {
            throw new Error('Failed to register');
        }
        return response; // Return the response object
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};
