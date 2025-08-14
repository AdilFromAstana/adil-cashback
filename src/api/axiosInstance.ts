import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Интерсептор для автоматической подстановки токена
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // безопасно через set
      config.headers?.set?.("Authorization", `Bearer ${token}`);
      // если set нет (для старых типов), можно через any
      // (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
