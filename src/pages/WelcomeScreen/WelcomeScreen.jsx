import { useAuth } from '../../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/login" />;

  // Determinar saludo según la hora
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  };

  // Trámites disponibles
  const tramites = [
    { 
      id: 'alta', 
      nombre: 'ALTA', 
      descripcion: 'Registrar nuevo personal',
      icon: 'bx-user-plus',
      disponible: true,
      color: '#3C91E6'
    },
    { 
      id: 'listado-activo', 
      nombre: 'LISTADO DE PERSONAL ACTIVO', 
      descripcion: 'Ver personal activo por rango',
      icon: 'bx-list-ul',
      disponible: false,
      color: '#FFCE26'
    },
    { 
      id: 'carta-responsiva', 
      nombre: 'ALTA CARTA RESPONSIVA', 
      descripcion: 'Generar carta responsiva',
      icon: 'bx-file',
      disponible: false,
      color: '#FD7238'
    },
    { 
      id: 'actualizacion', 
      nombre: 'ACTUALIZACIÓN', 
      descripcion: 'Actualizar información',
      icon: 'bx-refresh',
      disponible: false,
      color: '#3C91E6'
    },
    { 
      id: 'reimpresion', 
      nombre: 'REIMPRESIÓN', 
      descripcion: 'Reimprimir documentos',
      icon: 'bx-printer',
      disponible: false,
      color: '#FFCE26'
    },
    { 
      id: 'listado-nominal', 
      nombre: 'LISTADO NOMINAL', 
      descripción: 'Ver listado nominal',
      icon: 'bx-spreadsheet',
      disponible: false,
      color: '#FD7238'
    },
    { 
      id: 'baja', 
      nombre: 'BAJA', 
      descripcion: 'Dar de baja personal',
      icon: 'bx-user-minus',
      disponible: false,
      color: '#DB504A'
    },
    { 
      id: 'consulta', 
      nombre: 'CONSULTA', 
      descripcion: 'Consultar acuses y oficios',
      icon: 'bx-search',
      disponible: false,
      color: '#3C91E6'
    }
  ];

  const handleTramiteClick = (tramite) => {
    if (tramite.disponible) {
      navigate('/dashboard', { state: { section: tramite.id } });
    }
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        <div className="welcome-header">
          <h1 className="welcome-greeting">
            {getGreeting()}, {user?.nombre} {user?.apellido}
          </h1>
          <h2 className="welcome-question">¿Qué quieres hacer primero?</h2>
        </div>

        <div className="tramites-grid">
          {tramites.map((tramite) => (
            <button
              key={tramite.id}
              className={`tramite-card ${!tramite.disponible ? 'disabled' : ''}`}
              onClick={() => handleTramiteClick(tramite)}
              disabled={!tramite.disponible}
              style={{ '--card-color': tramite.color }}
            >
              <div className="tramite-icon">
                <i className={`bx ${tramite.icon}`}></i>
              </div>
              <div className="tramite-info">
                <h3>{tramite.nombre}</h3>
                <p>{tramite.descripcion}</p>
                {!tramite.disponible && (
                  <span className="badge-pronto">Próximamente</span>
                )}
              </div>
            </button>
          ))}
        </div>

        <button className="dashboard-button" onClick={handleDashboardClick}>
          <i className='bx bxs-dashboard'></i>
          Ir al Dashboard
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
