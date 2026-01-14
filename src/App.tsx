import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';

function App() {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  return (
    <div className="container">
      <Sidebar isHidden={isSidebarHidden} />
      <section id="content">
        <Navbar onToggleSidebar={toggleSidebar} />
        <MainContent />
      </section>
    </div>
  );
}

export default App;
