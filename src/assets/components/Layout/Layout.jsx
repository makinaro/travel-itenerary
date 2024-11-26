import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { SidebarItem } from "../Sidebar/Sidebar";
import { LayoutDashboard , Calendar1 , Settings, Plus } from "lucide-react";

export default function Layout() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar>
        {/* Sidebar Navigation Items */}
        <SidebarItem icon={<LayoutDashboard  size={20} />} text="Dashboard" to="/dashboard" alert />
        <SidebarItem icon={<Calendar1  size={20} />} text="Calendar" to="/calendar" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" to="/settings" />
        <SidebarItem icon={<Plus  size={20} />} text="Create A New Trip" to="/createnew" />

      </Sidebar>
      <Outlet />
    </div>
  );
}
