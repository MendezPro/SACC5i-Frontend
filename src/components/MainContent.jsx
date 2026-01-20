import React from 'react';
import { useAuth } from '../context/AuthContext';
import Usuarios from '../pages/Usuarios';

const MainContent = ({ activeSection }) => {
    const { user } = useAuth();

    // Si la sección activa es Usuarios, renderizar ese componente
    if (activeSection === 'Usuarios') {
        return <Usuarios />;
    }

    // Si la sección activa es Perfil
    if (activeSection === 'Perfil') {
        return (
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Mi Perfil</h1>
                        <ul className="breadcrumb">
                            <li><a href="#">SACC5i</a></li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li><a className="active" href="#">Perfil</a></li>
                        </ul>
                    </div>
                </div>
                <div style={{ padding: '20px', backgroundColor: 'var(--light)', borderRadius: '10px', marginTop: '20px' }}>
                    <h2>Información Personal</h2>
                    <p><strong>Nombre:</strong> {user?.nombre} {user?.apellido}</p>
                    <p><strong>Usuario:</strong> {user?.usuario}</p>
                    <p><strong>Rol:</strong> {user?.rol}</p>
                    <p><strong>Extensión:</strong> {user?.extension}</p>
                    {user?.region_nombre && <p><strong>Región:</strong> {user?.region_nombre}</p>}
                    
                    {!user?.password_changed && (
                        <p style={{ color: 'red', fontWeight: 'bold', marginTop: '20px' }}>
                            ⚠️ Debe cambiar su contraseña
                        </p>
                    )}
                </div>
            </main>
        );
    }

    // Si es Solicitudes
    if (activeSection === 'Solicitudes') {
        return (
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Gestión de Solicitudes</h1>
                        <ul className="breadcrumb">
                            <li><a href="#">SACC5i</a></li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li><a className="active" href="#">Solicitudes</a></li>
                        </ul>
                    </div>
                </div>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--dark-grey)', fontSize: '18px' }}>
                        Módulo de solicitudes en desarrollo...
                    </p>
                </div>
            </main>
        );
    }

    // Si es Reportes
    if (activeSection === 'Reportes') {
        return (
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Reportes</h1>
                        <ul className="breadcrumb">
                            <li><a href="#">SACC5i</a></li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li><a className="active" href="#">Reportes</a></li>
                        </ul>
                    </div>
                </div>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--dark-grey)', fontSize: '18px' }}>
                        Módulo de reportes en desarrollo...
                    </p>
                </div>
            </main>
        );
    }

    // Dashboard por defecto
    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Bienvenido, {user?.nombre} {user?.apellido}</h1>
                    <ul className="breadcrumb">
                        <li>
                            <a href="#">SACC5i</a>
                        </li>
                        <li><i className='bx bx-chevron-right' ></i></li>
                        <li>
                            <a className="active" href="#">Dashboard</a>
                        </li>
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

            <ul className="box-info">
                <li>
                    <i className='bx bxs-user' ></i>
                    <span className="text">
                        <h3>{user?.usuario}</h3>
                        <p>Usuario</p>
                    </span>
                </li>
                <li>
                    <i className='bx bxs-id-card' ></i>
                    <span className="text">
                        <h3>{user?.rol}</h3>
                        <p>Rol</p>
                    </span>
                </li>
                <li>
                    <i className='bx bxs-phone' ></i>
                    <span className="text">
                        <h3>{user?.extension}</h3>
                        <p>Extensión</p>
                    </span>
                </li>
            </ul>

            <div className="table-data">
                <div className="order">
                    <div className="head">
                        <h3>Solicitudes Recientes</h3>
                        <i className='bx bx-plus icon' style={{cursor: 'pointer'}} title="Nueva Solicitud"></i>
                    </div>
                    <p style={{padding: '20px', textAlign: 'center', color: 'var(--dark-grey)'}}>
                        No hay solicitudes registradas. Esta sección se implementará próximamente.
                    </p>
                </div>
                <div className="todo">
                    <div className="head">
                        <h3>Accesos Rápidos</h3>
                    </div>
                    <ul className="todo-list">
                        <li style={{cursor: 'pointer', border: 'none', padding: '15px'}}>
                            <i className='bx bx-file' style={{fontSize: '24px', marginRight: '10px'}}></i>
                            <p>Nueva Solicitud</p>
                        </li>
                        <li style={{cursor: 'pointer', border: 'none', padding: '15px'}}>
                            <i className='bx bx-search' style={{fontSize: '24px', marginRight: '10px'}}></i>
                            <p>Buscar Solicitud</p>
                        </li>
                        <li style={{cursor: 'pointer', border: 'none', padding: '15px'}}>
                            <i className='bx bx-bar-chart' style={{fontSize: '24px', marginRight: '10px'}}></i>
                            <p>Ver Reportes</p>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default MainContent;
