import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Tv,
  Briefcase,
  Search,
  LayoutGrid,
  FolderOpen,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import "./Sidebar.css";

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, url: "/dashboard" },
  { id: "teams", label: "Team", icon: Users, url: "/dashboard/teams" },
  { id: "mentors", label: "Mentors", icon: Users, url: "/dashboard/mentors" },
  { id: "interns-list", label: "Interns", icon: GraduationCap, url: "/dashboard/interns" },
  { id: "trainings", label: "Training", icon: Tv, url: "/dashboard/trainings" },
  { id: "internships-posts", label: "Internships", icon: Briefcase, url: "/dashboard/internships" },
  { id: "jobs-posts", label: "Jobs", icon: Search, url: "/dashboard/jobs" },
  { id: "services", label: "Services", icon: LayoutGrid, url: "/dashboard/services" },
  { id: "projects", label: "Projects", icon: FolderOpen, url: "/dashboard/projects" },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const width = collapsed ? "72px" : "240px";
    document.documentElement.style.setProperty("--sidebar-width", width);
  }, [collapsed]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarClass = ["sidebar", collapsed ? "collapsed" : "expanded", mobileOpen ? "expanded" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <button
        className="sidebar__mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileOpen && (
        <div className="sidebar__overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={sidebarClass}>
        <div className="sidebar__logo">
          <img src="/Logo2.png" alt="Leafclutch logo" className="sidebar__logo-icon" />
          <span className="sidebar__logo-text">Leafclutch Technologies</span>
        </div>

        <nav className="sidebar__nav">

          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.url}
                end
                data-label={item.label}
                className={({ isActive }) => `sidebar__nav-link${isActive ? " active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <Icon className="sidebar__nav-icon" size={18} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="sidebar__nav-label">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__user-left">
              <div className="sidebar__avatar">
                <User size={16} />
              </div>
              <div className="sidebar__user-info">
                <p className="sidebar__user-name">Admin</p>
                <p className="sidebar__user-status">Online</p>
              </div>
            </div>
            <button
              className="sidebar__logout-btn"
              onClick={() => navigate("/logout")}
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        <button
          className="sidebar__toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;