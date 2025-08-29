import axios from 'axios';

// Ganti URL ini dengan base URL API kamu
const api = axios.create({
  baseURL: process.env.BASE_API_URL || 'http://127.0.0.1:8000/api',
  timeout: 10000, // 10 detik timeout
  headers: {
    'Content-Type': 'application/json',
    // Tambahkan header lain jika perlu
  },
});

// const apiToken = axios.create({
//   baseURL: process.env.BASE_API_URL || 'http://localhost:8000/api',
//   timeout: 10000, // 10 detik timeout
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//     // Tambahkan header lain jika perlu
//   },
// });

// (Opsional) Tambah interceptor untuk request/response jika perlu
api.interceptors.request.use(config => {
  // Misal: tambahkan token auth jika ada
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    // Handle error global
    if (error.response && error.response.status === 401) {
      // Jangan redirect jika di halaman register
      if (typeof window !== 'undefined' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// (Opsional) Tambah interceptor untuk request/response jika perlu
// api.interceptors.request.use(config => {
//   // Misal: tambahkan token auth jika ada
//   return config;
// });

// api.interceptors.response.use(
//   response => response,
//   error => {
//     // Handle error global
//     return Promise.reject(error);
//   }
// );

export default api;
