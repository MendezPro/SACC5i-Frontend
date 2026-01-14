//typescriptreact
import React, { useState, useEffect } from 'react';

interface NavbarProps {
    onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
    const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
    const [showNotificationMenu, setShowNotificationMenu] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleToggleMenu = (menu: 'categories' | 'notification' | 'profile') => {
        setShowCategoriesMenu(menu === 'categories' ? !showCategoriesMenu : false);
        setShowNotificationMenu(menu === 'notification' ? !showNotificationMenu : false);
        setShowProfileMenu(menu === 'profile' ? !showProfileMenu : false);
    };

    useEffect(() => {
        // Read initial dark mode preference from localStorage
        const darkModePreference = localStorage.getItem('dark-mode');
        if (darkModePreference === 'enabled') {
            setIsDarkMode(true);
            document.body.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.body.classList.remove('dark');
        }
    }, []); // Empty dependency array means this effect runs only once on mount

    useEffect(() => {
        // Update localStorage and body class when isDarkMode state changes
        if (isDarkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('dark-mode', 'disabled');
        }
    }, [isDarkMode]); // Effect runs whenever isDarkMode changes

    const handleDarkModeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDarkMode(event.target.checked);
    };

    return (
        <nav>
            <i className='bx bx-menu bx-sm' onClick={onToggleSidebar}></i>
            <a href="#" className="nav-link" id="categoriesLink" onClick={() => handleToggleMenu('categories')}>Categories</a>
            <div className={`categories-menu ${showCategoriesMenu ? 'show' : ''}`} id="categoriesMenu">
                <ul>
                    <li><a href="#"><i className='bx bxs-home'></i>Home & Garden</a></li>
                    <li><a href="#"><i className='bx bxs-football'></i>Sports</a></li>
                    <li><a href="#"><i className='bx bxs-book'></i>Books</a></li>
                </ul>
            </div>
            <form action="#">
                <div className="form-input">
                    <input type="search" placeholder="Search..." />
                    <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                </div>
            </form>
            <input type="checkbox" className="checkbox" id="switch-mode" hidden checked={isDarkMode} onChange={handleDarkModeToggle} />
            <label className="swith-lm" htmlFor="switch-mode" title="Toggle Dark/Light Mode">
                <i className="bx bxs-moon"></i>
                <i className="bx bx-sun"></i>
                <div className="ball"></div>
            </label>

            {/* Notification Bell */}
            <a href="#" className="notification" id="notificationIcon" aria-label="Notifications" onClick={() => handleToggleMenu('notification')}>
                <i className='bx bxs-bell bx-tada-hover'></i>
                <span className="num">5</span>
            </a>
            <div className={`notification-menu ${showNotificationMenu ? 'show' : ''}`} id="notificationMenu">
                <ul> {/* Assuming these list items are static for now */}
                    <li>New message from John</li>
                    <li>Your order has been shipped</li>
                    <li>New comment on your post</li>
                    <li>Update available for your app</li>
                    <li>Reminder: Meeting at 3PM</li>
                </ul>
            </div>

            {/* Profile Menu */}
            <a href="#" className="profile" id="profileIcon" onClick={() => handleToggleMenu('profile')}>
                <img src="img/people.png" alt="Profile" />
            </a>
            <div className={`profile-menu ${showProfileMenu ? 'show' : ''}`} id="profileMenu">
                <ul> {/* Assuming these list items are static for now */}
                    <li><a href="#">My Profile</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Log Out</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;