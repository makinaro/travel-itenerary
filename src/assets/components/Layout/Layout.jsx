import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { SidebarItem } from "../Sidebar/Sidebar";
import { LayoutDashboard, Calendar1, Settings, Plus } from "lucide-react";
import CreateTrip from "../CreateTrip/CreateTrip"; // Import CreateTrip component

export default function Layout() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCreateTripOpen, setCreateTripOpen] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

  const handleOpenCreateTrip = () => setCreateTripOpen(true);
  const handleCloseCreateTrip = () => setCreateTripOpen(false);
  const handleConfirmCreateTrip = (tripData) => {
    console.log("Trip Created:", tripData); // Save trip logic
    setCreateTripOpen(false);
  };

  return (
    <div className={`flex h-screen w-full ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* Sidebar */}
      <Sidebar toggleSidebar={toggleSidebar}>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" to="/dashboard" alert />
        <SidebarItem icon={<Calendar1 size={20} />} text="Calendar" to="/calendar" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" to="/settings" />
        <SidebarItem
          icon={<Plus size={20} />}
          text="Create&nbsp;New&nbsp;Trip"
          onClick={handleOpenCreateTrip} // Open modal
        />
      </Sidebar>

      {/* Main Content */}
      <main className="flex-grow overflow-auto h-screen">
        <div className="dashboard-container">
          <Outlet />
        </div>
      </main>

      {/* CreateTrip Modal */}
      {isCreateTripOpen && (
        <CreateTrip
          isOpen={isCreateTripOpen}
          onClose={handleCloseCreateTrip}
          onConfirm={handleConfirmCreateTrip}
        />
      )}
    </div>
  );
}
