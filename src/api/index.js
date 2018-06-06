import axios from 'axios';
import { message } from 'antd';

const apiAxios = axios.create({
  baseURL: 'http://www.randomtext.me/api',
});

// apiAxios.defaults.headers.common['Content-Type'] = 'application/json';

apiAxios.interceptors.request.use(
  (config) => {
    const configNew = config;
    return configNew;
  },
  error => Promise.reject(error),
);

apiAxios.interceptors.response.use(
  (res) => {
    switch (res.status) {
      case 200:
        return Promise.resolve(res.data);
      default:
        setTimeout(() => message.error('요청중에 문제가 발생했습니다'), 700);
        return Promise.reject(res.data);
    }
  },
  (error) => {
    setTimeout(() => message.error('요청중에 문제가 발생했습니다'), 700);
    return Promise.reject(error);
  },
);

export default apiAxios;
