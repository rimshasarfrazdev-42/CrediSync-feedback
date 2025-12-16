import { useState, useEffect } from 'react';
import SideBar from '../layouts/sideBar/Sidebar';
import TopBar from '../components/DashBoard/TopBar';
import UpgradeAccountModal from '../components/Modals/Dashboard/UpgradeAccountModal';

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
  }, [isModalOpen]);
  return (
    <div className="flex">
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <TopBar toggleSidebar={toggleSidebar} openModal={openModal} />
        <main className="p-4 bg-white md:p-4">{children}</main>
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black opacity-50 xl:hidden" onClick={toggleSidebar}></div>
      )}
      {isModalOpen && <UpgradeAccountModal closeModal={closeModal} />}
    </div>
  );
}