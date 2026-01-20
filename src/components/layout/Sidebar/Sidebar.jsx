import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isHidden, activeSection, onSectionChange }) => {
    const { logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleItemClick = (itemText) => {
        onSectionChange(itemText);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <section id="sidebar" className={isHidden ? 'hide' : ''}>
            <a href="#" className="brand" onClick={() => handleItemClick('Dashboard')}>
                <i className='bx bxs-smile bx-lg'></i>
                <span className="text">SACC5i</span>
            </a>
            <ul className="side-menu top">
                <li className={activeSection === 'Dashboard' ? 'active' : ''}>
                    <a href="#" onClick={() => handleItemClick('Dashboard')}>
                        <i className='bx bxs-dashboard bx-sm'></i>
                        <span className="text">Dashboard</span>
                    </a>
                </li>
                <li className={activeSection === 'Alta' ? 'active' : ''}>
                    <a href="#" onClick={() => handleItemClick('Alta')}>
                        <i className='bx bx-user-plus bx-sm'></i>
                        <span className="text">Alta</span>
                    </a>
                </li>
                <li className={activeSection === 'Listado Personal Activo' ? 'active' : ''}>
                    <a href="#" onClick={() => handleItemClick('Listado Personal Activo')}>
                        <i className='bx bx-list-ul bx-sm'></i>
                        <span className="text">Listado Personal Activo</span>
                    </a>
                </li>
                <li className={activeSection === 'Alta Carta Responsiva' ? 'active' : ''}>
                    <a href="#" onClick={() => handleItemClick('Alta Carta Responsiva')}>
                        <i className='bx bx-file bx-sm'></i>
                        <span className="text">Alta Carta Responsiva</span>
                    </a>
                </li>
                <li className={activeSection === 'Actualización' ? 'active' : ''}>
                    <a href="#" onClick={() => handleItemClick('Actualización')}>
                        <i className='bx bx-refresh bx-sm'></i>
                        <span className="text">Actualización</span>
                    </a>
                </li>
                <li className={activeSection === 'Reimpresión' ? 'active' : ''}>
                    <a href="#" onClick={() => handleItemClick('Reimpresión')}>
                        <i className='bx bx-printer bx-sm'></i>
                        <span className="text">Reimpresión</span>
                    </a>
                </li>
                <li className={activeSection === 'Listado Nominal' ? 'active' : ''}>
                    <a href="#" onClick={() => handleItemClick('Listado Nominal')}>
                        <i className='bx bx-spreadsheet bx-sm'></i>
                        <span className="text">Listado Nominal</span>
                    </a>
                </li>
                <li className={activeSection === 'Baja' ? 'active' : ''}>
                    <a href="#" onClick={() => handleItemClick('Baja')}>
                        <i className='bx bx-user-minus bx-sm'></i>
                        <span className="text">Baja</span>
                    </a>
                </li>
                <li className={activeSection === 'Consulta' ? 'active' : ''}>
                    <a href="#" onClick={() => handleItemClick('Consulta')}>
                        <i className='bx bx-search bx-sm'></i>
                        <span className="text">Consulta</span>
                    </a>
                </li>
                <li className={activeSection === 'Solicitudes' ? 'active' : ''}>
                    <a href="#" onClick={() => handleItemClick('Solicitudes')}>
                        <i className='bx bxs-file bx-sm'></i>
                        <span className="text">Solicitudes</span>
                    </a>
                </li>
                {isAdmin() && (
                    <li className={activeSection === 'Usuarios' ? 'active': ''}>
                        <a href="#" onClick={() => handleItemClick('Usuarios')}>
                            <i className='bx bxs-group bx-sm'></i>
                            <span className="text">Usuarios</span>
                        </a>
                    </li>
                )}
                <li className={activeSection === 'Reportes' ? 'active': ''}>
                    <a href="#" onClick={() => handleItemClick('Reportes')}>
                        <i className='bx bxs-doughnut-chart bx-sm'></i>
                        <span className="text">Reportes</span>
                    </a>
                </li>
            </ul>
        </section>
    );
};

export default Sidebar;
