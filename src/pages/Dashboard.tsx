import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h1>Dashboard SACC5i</h1>
      
      <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
        <h2>Bienvenido, {user.nombre} {user.apellido}</h2>
        <p><strong>Usuario:</strong> {user.usuario}</p>
        <p><strong>Rol:</strong> {user.rol}</p>
        <p><strong>Extensión:</strong> {user.extension}</p>
        {user.region_nombre && <p><strong>Región:</strong> {user.region_nombre}</p>}
        
        {!user.password_changed && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            ⚠️ Debe cambiar su contraseña
          </p>
        )}
      </div>

      <div>
        {isAdmin() && (
          <button 
            onClick={() => navigate('/usuarios')}
            style={{ padding: '10px 20px', marginRight: '10px' }}
          >
            Gestionar Usuarios
          </button>
        )}
        
        <button 
          onClick={handleLogout}
          style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
