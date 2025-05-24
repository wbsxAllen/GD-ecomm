import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_URL || 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 处理未授权错误
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 