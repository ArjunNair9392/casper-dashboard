import axios from './axiosConfig';

export const getShareUsers = (userId:string) => {
    return axios.get(`https://uploadservice-juzqocjfea-uc.a.run.app/getSharedUsers?userId=${userId}`);
};