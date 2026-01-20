import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Instancia de axios configurada
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funciones de autenticación
export const login = (username, password) => {
  return api.post('/auth/login', { username, password });
};

export const getProfile = () => {
  return api.get('/auth/profile');
};

export const changePassword = (currentPassword, newPassword) => {
  return api.post('/auth/change-password', { currentPassword, newPassword });
};

// Funciones de admin
export const getUsuarios = (params = {}) => {
  return api.get('/admin/usuarios', { params });
};

export const createUsuario = (data) => {
  return api.post('/admin/usuarios', data);
};

export const updateUsuario = (id, data) => {
  return api.put(`/admin/usuarios/${id}`, data);
};

export const activateUsuario = (id) => {
  return api.patch(`/admin/usuarios/${id}/activate`);
};

export const deactivateUsuario = (id) => {
  return api.patch(`/admin/usuarios/${id}/deactivate`);
};

export const resetPasswordUsuario = (id) => {
  return api.patch(`/admin/usuarios/${id}/reset-password`);
};

export default api;
