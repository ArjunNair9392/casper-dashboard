import axios from './axiosConfig';

export const resgistrationService = (email:string, creator:string) => {
    return axios.get(`https://casperai-1405.postman.co/workspace/9c80d26d-463d-4522-b40f-52650e67d52b/collection/32335106-93447bb1-6427-4abc-8d03-704e5526b172?action=share&source=email&creator=32335106?action=share&source=${email}&creator=${creator}`);
};
