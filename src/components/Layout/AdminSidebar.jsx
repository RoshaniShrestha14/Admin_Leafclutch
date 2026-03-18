// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   BookOpen,
//   Briefcase,
//   MessageSquareQuote,
//   LogOut,
//   User,
//   ChevronLeft,
//   ChevronRight,
//   Menu,
//   X,
//   CircleHelp,
// } from "lucide-react";
// import "./Sidebar.css";

// const menuItems = [
//   { id: "overview", label: "Overview", icon: LayoutDashboard, url: "/dashboard" },
//   { id: "Courses", label: "Courses", icon: BookOpen, url: "/dashboard/courses" },
//   // { id: "mentors", label: "Mentors", icon: Users, url: "/dashboard/mentors" },
//   // { id: "interns-list", label: "Interns", icon: GraduationCap, url: "/dashboard/interns" },
//   { id: "faq", label: "FAQs", icon: CircleHelp, url: "/dashboard/faqs" },
//   { id: "internships-plans", label: "Internships Plans", icon: Briefcase, url: "/dashboard/internships" },
//   // { id: "jobs-posts", label: "Jobs", icon: Search, url: "/dashboard/jobs" },
//   // { id: "", label: "Services", icon: LayoutGrid, url: "/dashboard/services" },
//   { id: "Testimonials", label: "Testimonials", icon: MessageSquareQuote, url: "/dashboard/testimonials" },
// ];

// const AdminSidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const width = collapsed ? "72px" : "240px";
//     document.documentElement.style.setProperty("--sidebar-width", width);
//   }, [collapsed]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 769) setMobileOpen(false);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const sidebarClass = ["sidebar", collapsed ? "collapsed" : "expanded", mobileOpen ? "expanded" : ""]
//     .filter(Boolean)
//     .join(" ");

//   return (
//     <>
//       <button
//         className="sidebar__mobile-toggle"
//         onClick={() => setMobileOpen(!mobileOpen)}
//         aria-label="Toggle sidebar"
//       >
//         {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//       </button>

//       {mobileOpen && (
//         <div className="sidebar__overlay" onClick={() => setMobileOpen(false)} />
//       )}

//       <aside className={sidebarClass}>
//         <NavLink
//           to="/dashboard"
//           end
//           className="sidebar__logo"
//           onClick={() => setMobileOpen(false)}
//         >
//           <img src="/Logo2.png" alt="Leafclutch logo" className="sidebar__logo-icon" />
//           <span className="sidebar__logo-text">Leafclutch Technologies</span>
//         </NavLink>

//         <nav className="sidebar__nav">

//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <NavLink
//                 key={item.id}
//                 to={item.url}
//                 end
//                 data-label={item.label}
//                 className={({ isActive }) => `sidebar__nav-link${isActive ? " active" : ""}`}
//                 onClick={() => setMobileOpen(false)}
//               >
//                 {({ isActive }) => (
//                   <>
//                     <Icon className="sidebar__nav-icon" size={18} strokeWidth={isActive ? 2.5 : 2} />
//                     <span className="sidebar__nav-label">{item.label}</span>
//                   </>
//                 )}
//               </NavLink>
//             );
//           })}
//         </nav>

//         <div className="sidebar__footer">
//           <div className="sidebar__user">
//             <div className="sidebar__user-left">
//               <div className="sidebar__avatar">
//                 <User size={16} />
//               </div>
//               <div className="sidebar__user-info">
//                 <p className="sidebar__user-name">Admin</p>
//                 <p className="sidebar__user-status">Online</p>
//               </div>
//             </div>
//             <button
//               className="sidebar__logout-btn"
//               onClick={() => navigate("/logout")}
//               title="Logout"
//             >
//               <LogOut size={16} />
//             </button>
//           </div>
//         </div>

//         <button
//           className="sidebar__toggle"
//           onClick={() => setCollapsed(!collapsed)}
//           aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//         >
//           {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//         </button>
//       </aside>
//     </>
//   );
// };

// export default AdminSidebar;
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  MessageSquareQuote,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  CircleHelp,
} from "lucide-react";
import "./Sidebar.css";

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, url: "/dashboard" },
  { id: "Courses", label: "Courses", icon: BookOpen, url: "/dashboard/courses" },
  { id: "faq", label: "FAQs", icon: CircleHelp, url: "/dashboard/faqs" },
  { id: "internships-plans", label: "Internships Plans", icon: Briefcase, url: "/dashboard/internships" },
  { id: "Testimonials", label: "Testimonials", icon: MessageSquareQuote, url: "/dashboard/testimonials" },
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

  // Prevent body scroll when mobile modal is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const sidebarClass = ["sidebar", collapsed ? "collapsed" : "expanded"]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* ── Mobile top bar ── */}
      <header className="mobile-topbar">
        <div className="mobile-topbar__brand">
          <img src="/Logo2.png" alt="Leafclutch logo" className="mobile-topbar__logo" />
          <span className="mobile-topbar__name">Leafclutch Technologies</span>
        </div>
        <button
          className="mobile-topbar__hamburger"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* ── Mobile modal overlay ── */}
      {mobileOpen && (
        <div
          className="mobile-modal__backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={`mobile-modal ${mobileOpen ? "mobile-modal--open" : ""}`}>
        <div className="mobile-modal__header">
          <div className="mobile-modal__brand">
            <img src="/Logo2.png" alt="Leafclutch logo" className="mobile-modal__logo" />
            <span className="mobile-modal__name">Leafclutch Technologies</span>
          </div>
          <button
            className="mobile-modal__close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-modal__nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.url}
                end
                className={({ isActive }) =>
                  `mobile-modal__link${isActive ? " active" : ""}`
                }
                onClick={() => setMobileOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <div className="mobile-modal__link-icon">
                      <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="mobile-modal__footer">
          <div className="mobile-modal__user">
            <div className="sidebar__avatar">
              <User size={16} />
            </div>
            <div className="sidebar__user-info">
              <p className="sidebar__user-name">Admin</p>
              <p className="sidebar__user-status">Online</p>
            </div>
          </div>
          <button
            className="mobile-modal__logout"
            onClick={() => { setMobileOpen(false); navigate("/logout"); }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>

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
                className={({ isActive }) =>
                  `sidebar__nav-link${isActive ? " active" : ""}`
                }
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
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;