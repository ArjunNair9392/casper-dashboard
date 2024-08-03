import axios from './axiosConfig';

export const listChannelsForCompany = (company_name: string) => {
    return axios.get(`https://uploadservice-2imgap5w2q-uc.a.run.app/listChannelsForCompany?company_name=${company_name}`);
};