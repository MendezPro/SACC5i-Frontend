import { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, activateUsuario, deactivateUsuario, resetPasswordUsuario } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buscar, setBuscar] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    usuario: '',
    nombre: '',
    apellido: '',
    extension: '',
    rol: 'analista',
    region_id: ''
  });

  const { isSuperAdmin } = useAuth();

  useEffect(() => {
    loadUsuarios();
  }, [buscar]);

  const loadUsuarios = async () => {
    try {
      const response = await getUsuarios({ buscar });
      setUsuarios(response.data.data);
    } catch (error) {
      alert('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createUsuario(newUser);
      alert('Usuario creado exitosamente. Contraseña inicial: ' + newUser.extension);
      setShowForm(false);
      setNewUser({ usuario: '', nombre: '', apellido: '', extension: '', rol: 'analista', region_id: '' });
      loadUsuarios();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al crear usuario');
    }
  };

  const handleActivate = async (id) => {
    try {
      await activateUsuario(id);
      alert('Usuario activado');
      loadUsuarios();
    } catch (error) {
      alert('Error al activar');
    }
  };

  const handleDeactivate = async (id) => {
    if (!confirm('¿Desactivar usuario?')) return;
    try {
      await deactivateUsuario(id);
      alert('Usuario desactivado');
      loadUsuarios();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al desactivar');
    }
  };

  const handleReset = async (id) => {
    if (!confirm('¿Resetear contraseña a extensión?')) return;
    try {
      await resetPasswordUsuario(id);
      alert('Contraseña reseteada a extensión');
    } catch (error) {
      alert('Error al resetear');
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <main style={{ width: '100%', padding: '20px' }}>
      <div className="head-title">
        <div className="left">
          <h1>Gestión de Usuarios</h1>
          <ul className="breadcrumb">
            <li><a href="#">SACC5i</a></li>
            <li><i className='bx bx-chevron-right'></i></li>
            <li><a className="active" href="#">Usuarios</a></li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre, usuario, extensión..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '8px 16px' }}>
          {showForm ? 'Cancelar' : 'Crear Usuario'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
          <h3>Nuevo Usuario</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input
              placeholder="Usuario (ej: juan_perez)"
              value={newUser.usuario}
              onChange={(e) => setNewUser({...newUser, usuario: e.target.value})}
              required
            />
            <input
              placeholder="Nombre"
              value={newUser.nombre}
              onChange={(e) => setNewUser({...newUser, nombre: e.target.value})}
              required
            />
            <input
              placeholder="Apellido"
              value={newUser.apellido}
              onChange={(e) => setNewUser({...newUser, apellido: e.target.value})}
              required
            />
            <input
              placeholder="Extensión (será la contraseña inicial)"
              value={newUser.extension}
              onChange={(e) => setNewUser({...newUser, extension: e.target.value})}
              required
            />
            <select
              value={newUser.rol}
              onChange={(e) => setNewUser({...newUser, rol: e.target.value})}
            >
              <option value="analista">Analista</option>
              {isSuperAdmin() && <option value="admin">Admin</option>}
            </select>
            <input
              placeholder="Región ID (1-9, opcional)"
              type="number"
              value={newUser.region_id}
              onChange={(e) => setNewUser({...newUser, region_id: e.target.value})}
            />
          </div>
          <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>Crear</button>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Usuario</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nombre</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Ext</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Rol</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Región</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Estado</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.id}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.usuario}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.nombre} {user.apellido}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.extension}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.rol}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.region_nombre || '-'}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {user.activo ? '✅ Activo' : '❌ Inactivo'}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {user.activo ? (
                  <>
                    <button onClick={() => handleDeactivate(user.id)} style={{ marginRight: '5px' }}>
                      Desactivar
                    </button>
                    <button onClick={() => handleReset(user.id)}>Reset Pass</button>
                  </>
                ) : (
                  <button onClick={() => handleActivate(user.id)}>Activar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
