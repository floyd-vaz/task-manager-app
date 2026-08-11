import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoMark = () => (
  <svg
    className="sidebar-brand-mark"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="4" y="4" width="56" height="56" rx="14" stroke="currentColor" strokeWidth="2" opacity="0.35" />
    <path
      d="M18 22h28M32 22v28"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <circle cx="32" cy="22" r="4" fill="#2dd4bf" />
    <path
      d="M20 38h10M34 46h14"
      stroke="#2dd4bf"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.9"
    />
  </svg>
);

const NAV_ITEMS = [
  { id: "all", label: "All Tasks", icon: "M4 6h16M4 12h16M4 18h10" },
  { id: "pending", label: "Pending", icon: "M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "in-progress", label: "In Progress", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { id: "completed", label: "Completed", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const Sidebar = ({ activeView, onNavigate, open, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}

      <aside className={`sidebar${open ? " is-open" : ""}`} aria-label="Main navigation">
        <div className="sidebar-brand">
          <LogoMark />
          <div className="sidebar-brand-text">
            Task<span>Manager</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sidebar-link${activeView === item.id ? " is-active" : ""}`}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
            >
              <svg
                className="sidebar-link-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            Signed in as
            <strong>{user?.name || "User"}</strong>
          </div>
          <button type="button" className="sidebar-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
