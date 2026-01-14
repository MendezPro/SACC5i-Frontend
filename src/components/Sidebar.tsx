import React, { useState } from 'react';

interface SidebarProps {
    isHidden: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isHidden }) => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const handleItemClick = (itemText: string) => {
        setActiveItem(itemText);
    };

    return (
        <section id="sidebar" className={isHidden ? 'hide' : ''}>
            <a href="#" className="brand">
                <i className='bx bxs-smile bx-lg'></i>
                <span className="text">AdminHub</span>
            </a>
            <ul className="side-menu top">
                <li className={activeItem === 'Dashboard' ? 'active' : ''}>
                    <a href="#dashboard" onClick={() => handleItemClick('Dashboard')}>
                        <i className='bx bxs-dashboard bx-sm'></i>
                        <span className="text">Dashboard</span>
                    </a>
                </li>
                <li className={activeItem === 'My Store' ? 'active' : ''}>
                    <a href="#mystore" onClick={() => handleItemClick('My Store')}>
                        <i className='bx bxs-shopping-bag-alt bx-sm'></i>
                        <span className="text">My Store</span>
                    </a>
                </li>
                <li className={activeItem === 'Analytics' ? 'active': ''}>
                    <a href="#analytics" onClick={() => handleItemClick('Analytics')}>
                        <i className='bx bxs-doughnut-chart bx-sm'></i>
                        <span className="text">Analytics</span>
                    </a>
                </li>
                <li className={activeItem === 'Message' ? 'active': ''}>
                    <a href="#message" onClick={() => handleItemClick('Message')}>
                        <i className='bx bxs-message-dots bx-sm'></i>
                        <span className="text">Message</span>
                    </a>
                </li>
                <li className={activeItem === 'Team' ? 'active': ''}>
                    <a href="#team" onClick={() => handleItemClick('Team')}>
                        <i className='bx bxs-group bx-sm'></i>
                        <span className="text">Team</span>
                    </a>
                </li>
            </ul>
            <ul className="side-menu bottom">
                <li className={activeItem === 'Settings' ? 'active': ''}>
                    <a href="#settings" onClick={() => handleItemClick('Settings')}>
                        <i className='bx bxs-cog bx-sm bx-spin-hover'></i>
                        <span className="text">Settings</span>
                    </a>
                </li>
                <li className={activeItem === 'Logout' ? 'active': ''}>
                    <a href="#logout" className="logout" onClick={() => handleItemClick('Logout')}>
                        <i className='bx bx-power-off bx-sm bx-burst-hover'></i>
                        <span className="text">Logout</span>
                    </a>
                </li>
            </ul>
        </section>
    );
};

export default Sidebar;
