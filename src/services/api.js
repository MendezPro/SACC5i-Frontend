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

// Auth - Actualizar perfil propio
export const updateProfile = (data) => {
  return api.put('/auth/profile', data);
};

// Admin - Estadísticas
export const getEstadisticasAdmin = () => {
  return api.get('/admin/estadisticas');
};

// ==========================================
// SOLICITUDES (módulo ALTA)
// ==========================================

export const getSolicitudes = (params = {}) => {
  return api.get('/solicitudes', { params });
};

export const getSolicitudById = (id) => {
  return api.get(`/solicitudes/${id}`);
};

export const createSolicitud = (data) => {
  return api.post('/solicitudes', data);
};

export const updateSolicitud = (id, data) => {
  return api.put(`/solicitudes/${id}`, data);
};

export const deleteSolicitud = (id) => {
  return api.delete(`/solicitudes/${id}`);
};

export const updateEstatusSolicitud = (id, estatus) => {
  return api.put(`/solicitudes/${id}/estatus`, { estatus });
};

export const getEstadisticasSolicitudes = () => {
  return api.get('/solicitudes/estadisticas');
};

// ==========================================
// CATÁLOGOS
// ==========================================

export const getTiposOficio = () => {
  return api.get('/catalogos/tipos-oficio');
};

export const getMunicipios = () => {
  return api.get('/catalogos/municipios');
};

export const getRegiones = () => {
  return api.get('/catalogos/regiones');
};

export const getEstatus = () => {
  return api.get('/catalogos/estatus');
};

export default api;
