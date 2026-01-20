import { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, updateUsuario, activateUsuario, deactivateUsuario, resetPasswordUsuario } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buscar, setBuscar] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUsuario(editingUser.id, {
        usuario: editingUser.usuario,
        nombre: editingUser.nombre,
        apellido: editingUser.apellido,
        extension: editingUser.extension,
        region_id: editingUser.region_id || null,
        rol: editingUser.rol
      });
      alert('Usuario actualizado exitosamente');
      setEditingUser(null);
      loadUsuarios();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al actualizar usuario');
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

      {editingUser && (
        <form 
          onSubmit={handleUpdate} 
          style={{ 
            border: '2px solid #007bff', 
            padding: '20px', 
            marginBottom: '20px', 
            backgroundColor: '#e7f3ff',
            borderRadius: '8px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0 }}>Editar Usuario: {editingUser.usuario}</h3>
            <button 
              type="button" 
              onClick={() => setEditingUser(null)} 
              style={{ 
                padding: '5px 10px', 
                backgroundColor: '#dc3545', 
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Usuario:</label>
              <input
                placeholder="Usuario (ej: juan_perez)"
                value={editingUser.usuario}
                onChange={(e) => setEditingUser({...editingUser, usuario: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre:</label>
              <input
                placeholder="Nombre"
                value={editingUser.nombre}
                onChange={(e) => setEditingUser({...editingUser, nombre: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Apellido:</label>
              <input
                placeholder="Apellido"
                value={editingUser.apellido}
                onChange={(e) => setEditingUser({...editingUser, apellido: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Extensión:</label>
              <input
                placeholder="Extensión"
                value={editingUser.extension}
                onChange={(e) => setEditingUser({...editingUser, extension: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Rol:</label>
              <select
                value={editingUser.rol}
                onChange={(e) => setEditingUser({...editingUser, rol: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="analista">Analista</option>
                {isSuperAdmin() && <option value="admin">Admin</option>}
                {isSuperAdmin() && <option value="super_admin">Super Admin</option>}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Región ID:</label>
              <input
                placeholder="Región ID (1-9, opcional)"
                type="number"
                value={editingUser.region_id || ''}
                onChange={(e) => setEditingUser({...editingUser, region_id: e.target.value})}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <button 
              type="submit" 
              style={{ 
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              💾 Actualizar Usuario
            </button>
            <button 
              type="button" 
              onClick={() => setEditingUser(null)} 
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
                    <button 
                      onClick={() => setEditingUser(user)} 
                      style={{ 
                        marginRight: '5px',
                        padding: '5px 10px',
                        backgroundColor: '#ffc107',
                        color: 'black',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      Editar
                    </button>
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
