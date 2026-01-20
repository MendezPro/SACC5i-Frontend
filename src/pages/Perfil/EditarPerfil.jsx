import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateProfile, changePassword } from '../../services/api';

export default function EditarPerfil() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    extension: ''
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre,
        apellido: user.apellido,
        extension: user.extension
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      alert('Perfil actualizado exitosamente');
      window.location.reload(); // Recargar para actualizar datos en el contexto
    } catch (error) {
      alert(error.response?.data?.message || 'Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (passwords.newPassword.length < 6) {
      alert('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await changePassword(passwords.currentPassword, passwords.newPassword);
      alert('Contraseña cambiada exitosamente. Por seguridad, cerrará sesión.');
      // Opcional: cerrar sesión después de cambiar contraseña
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      alert(error.response?.data?.message || 'Error al cambiar contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Editar Mi Perfil</h1>
          <ul className="breadcrumb">
            <li><a href="#">SACC5i</a></li>
            <li><i className='bx bx-chevron-right'></i></li>
            <li><a className="active" href="#">Editar Perfil</a></li>
          </ul>
        </div>
      </div>

      {/* Alerta si debe cambiar contraseña */}
      {!user?.password_changed && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffc107',
          borderRadius: '5px',
          marginBottom: '20px',
          color: '#856404'
        }}>
          <strong>⚠️ IMPORTANTE:</strong> Debe cambiar su contraseña por seguridad.
        </div>
      )}

      {/* Formulario de datos personales */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h2>Datos Personales</h2>
        <form onSubmit={handleUpdateProfile}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
            <div>
              <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Nombre:</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Apellido:</label>
              <input
                type="text"
                value={formData.apellido}
                onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Extensión:</label>
              <input
                type="text"
                value={formData.extension}
                onChange={(e) => setFormData({...formData, extension: e.target.value})}
                style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Usuario:</label>
              <input
                type="text"
                value={user?.usuario || ''}
                disabled
                style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              <small style={{ color: '#666', fontSize: '12px' }}>El nombre de usuario no se puede cambiar</small>
            </div>
            <div>
              <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Rol:</label>
              <input
                type="text"
                value={user?.rol || ''}
                disabled
                style={{ width: '100%', padding: '8px', marginTop: '5px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              marginTop: '20px', 
              padding: '10px 20px', 
              backgroundColor: '#3C91E6',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      </div>

      {/* Sección de cambio de contraseña */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
        <h2>Seguridad</h2>
        {!showPasswordForm ? (
          <button 
            onClick={() => setShowPasswordForm(true)}
            style={{ 
              marginTop: '10px', 
              padding: '10px 20px', 
              backgroundColor: '#007bff', 
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Cambiar Contraseña
          </button>
        ) : (
          <form onSubmit={handleChangePassword} style={{ marginTop: '20px' }}>
            <div style={{ maxWidth: '400px' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Contraseña Actual:</label>
                <input
                  type="password"
                  value={passwords.currentPassword}
                  onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Nueva Contraseña:</label>
                <input
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                  required
                  minLength={6}
                />
                <small style={{ color: '#666', fontSize: '12px' }}>Mínimo 6 caracteres</small>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Confirmar Nueva Contraseña:</label>
                <input
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                  required
                  minLength={6}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="submit" 
                  disabled={loading} 
                  style={{ 
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  style={{ 
                    padding: '10px 20px', 
                    backgroundColor: '#6c757d', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
