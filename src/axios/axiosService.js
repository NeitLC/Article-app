import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const axiosService = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosService.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status === 401) {
            console.error('Ошибка аутентификации (401)');
        } else {
            console.error('Ошибка сервера:', error.response.data.message || error.message);
        }
        return Promise.reject(error);
    }
)

axiosService.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default axiosService;