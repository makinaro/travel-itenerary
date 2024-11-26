import React, { useContext, createContext, useState } from "react";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-60 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, to, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center py-2 px-3 my-1 font-medium rounded-md transition-all group ${
          isActive
            ? "bg-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }`
      }
    >
      {/* Icon */}
      <div className="text-lg">{icon}</div>

      {/* Text */}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "ml-3 w-auto" : "w-0"
        }`}
      >
        {text}
      </span>

      {/* Notification Dot */}
      {alert && (
        <div className="absolute right-3 w-2 h-2 bg-indigo-400 rounded-full"></div>
      )}
    </NavLink>
  );
}