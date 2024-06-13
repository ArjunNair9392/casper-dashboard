import axios from './axiosConfig';

export const addUsers = (userId: string, companyID: string) => {
    return axios.get(`https://registration-juzqocjfea-uc.a.run.app/addUser?userId=${userId}&companyId=${companyID}`);
};