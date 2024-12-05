import React, { useContext, createContext, useState } from "react";
import { LogOut, ChevronLast, ChevronFirst } from "lucide-react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  const handleLogout = () => {
    // Clear user data (e.g., token) from localStorage
    localStorage.removeItem("token");
    console.log("Logged out");

    // Redirect or reload the page to reset the app's state
    window.location.href = "/login";
  };

  return (
    <aside className={`${styles.sidebar} ${expanded ? "" : styles.collapsed}`}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`${expanded ? "w-32" : "w-0"}`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={styles.toggleButton}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className={styles.sidebarItems}>{children}</ul>
        </SidebarContext.Provider>

        <div className={styles.footer}>
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`${styles.userInfo} ${expanded ? "w-60 ml-3" : "w-0"}`}
          >
            <div className="userDetails">
              <span className="name">John Doe</span>
              <h4 className="username">@johndoe123_</h4>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 text-gray-600 hover:text-red-500"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <LogOut size={30} />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, to, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);

  if (to) {
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
        <div className="text-lg">{icon}</div>
        <span
          className={`${
            expanded ? "ml-3 w-auto" : "w-0"
          } overflow-hidden transition-all`}
        >
          {text}
        </span>
        {alert && <div className={styles.notificationDot}></div>}
      </NavLink>
    );
  }

  return (
    <button
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md transition-all group ${
        expanded ? "w-full" : ""
      } bg-transparent hover:bg-indigo-50 text-gray-600`}
      onClick={onClick}
    >
      <div className="text-lg">{icon}</div>
      <span
        className={`${
          expanded ? "ml-3 w-auto" : "w-0"
        } overflow-hidden transition-all`}
      >
        {text}
      </span>
    </button>
  );
}
