import axios from './axiosConfig';

export const getListFiles = (userId:string, code:string) => {
    return axios.get(`https://uploadservice-juzqocjfea-uc.a.run.app/listFiles?userId=${userId}&code=${code}`);
};
