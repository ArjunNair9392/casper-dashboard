import axios from './axiosConfig';

export const getSelectedFiles = (userId:string) => {
    // return axios.get(`http://192.168.1.69:8080/getFilesForUser?userId=${userId}`);
    return axios.get(`https://uploadservice-juzqocjfea-uc.a.run.app/getFilesForUser?userId=${userId}`);
};