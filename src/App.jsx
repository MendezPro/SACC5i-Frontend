import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useState } from 'react';
import Login from './pages/Login/Login';
import WelcomeScreen from './pages/WelcomeScreen/WelcomeScreen';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Navbar from './components/layout/Navbar/Navbar';
import MainContent from './components/layout/MainContent/MainContent';
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
        <Navbar 
          onToggleSidebar={toggleSidebar}
          onSectionChange={handleSectionChange}
        />
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
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/" element={<Navigate to="/welcome" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
