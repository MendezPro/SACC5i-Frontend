import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useState } from 'react';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import './index.css';

function DashboardLayout() {
  const { user, loading } = useAuth();
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('Dashboard');

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  if (loading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="container">
      <Sidebar 
        isHidden={isSidebarHidden} 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <section id="content">
        <Navbar onToggleSidebar={toggleSidebar} />
        <MainContent activeSection={activeSection} />
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
