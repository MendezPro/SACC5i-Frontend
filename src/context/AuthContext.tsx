import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginService, getProfile } from '../services/api';

interface User {
  id: number;
  nombre: string;
  apellido: string;
  usuario: string;
  rol: 'super_admin' | 'admin' | 'analista';
  extension: string;
  password_changed: boolean;
  region_id?: number;
  region_nombre?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getProfile()
        .then(res => setUser(res.data.data))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    const response = await loginService(username, password);
    const { token, usuario } = response.data;
    
    localStorage.setItem('token', token);
    setToken(token);
    setUser(usuario);
    
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAdmin = () => {
    return user !== null && (user.rol === 'admin' || user.rol === 'super_admin');
  };

  const isSuperAdmin = () => {
    return user !== null && user.rol === 'super_admin';
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAdmin, isSuperAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
