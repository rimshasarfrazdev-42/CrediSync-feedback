import { useState, useEffect } from 'react';
import SideBar from '../layouts/sideBar/Sidebar';
import TopBar from './TopBar';
//import UpgradeAccountModal from '../components/Modals/Dashboard/UpgradeAccountModal';
export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open on desktop
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
  }, [isModalOpen]);
  return (
    <div className="flex min-h-screen bg-white">
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`
        flex-1 flex flex-col min-w-0 transition-all duration-300
        ${isSidebarOpen ? 'lg:ml-[260px]' : 'ml-0'}
      `}
      >
        <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} openModal={openModal} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      {isSidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={toggleSidebar}></div>}
      {/* {isModalOpen && <UpgradeAccountModal closeModal={closeModal} />} */}
    </div>
  );
}
