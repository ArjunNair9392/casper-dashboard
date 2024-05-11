import axios from './axiosConfig';

interface CompanyFormData {
    company: string;
    address: string;
    city: string;
    state: string;
    phone_number: string;
    admin_email: string;
}

export const registerCompany = async (formData: CompanyFormData) => {
    try {
        const response = await axios.post('https://registration-juzqocjfea-uc.a.run.app/companyRegistration', formData);
        console.log(response);
        if(response.status != 200 && response.data.status !== 'success') {
            throw new Error('Failed to register');
        }
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};
