import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    isHidden: boolean;
    activeSection: string;
    onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isHidden, activeSection, onSectionChange }) => {
    const { logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleItemClick = (itemText: string) => {
        onSectionChange(itemText);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <section id="sidebar" className={isHidden ? 'hide' : ''}>
            <a href="#" className="brand">
                <i className='bx bxs-smile bx-lg'></i>
                <span className="text">AdminHub</span>
            </a>
            <ul className="side-menu top">
                <li className={activeSection === 'Dashboard' ? 'active' : ''}>
                    <a href="#" onClick={() => handleItemClick('Dashboard')}>
                        <i className='bx bxs-dashboard bx-sm'></i>
                        <span className="text">Dashboard</span>
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
            <ul className="side-menu bottom">
                <li className={activeSection === 'Perfil' ? 'active': ''}>
                    <a href="#" onClick={() => handleItemClick('Perfil')}>
                        <i className='bx bxs-user bx-sm'></i>
                        <span className="text">Mi Perfil</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="logout" onClick={handleLogout}>
                        <i className='bx bx-power-off bx-sm bx-burst-hover'></i>
                        <span className="text">Cerrar Sesión</span>
                    </a>
                </li>
            </ul>
        </section>
    );
};

export default Sidebar;
