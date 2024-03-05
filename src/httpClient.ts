import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        common: {
            'X-Movary-Client': 'Movary Web',
            Accept: 'application/json'
        }
    }
});

export default axiosInstance;
