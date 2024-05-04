import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://casperai-juzqocjfea-uc.a.run.app',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
