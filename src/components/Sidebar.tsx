import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Sidebar.css';

interface SidebarProps {
  onSidebarToggle: (isOpen: boolean) => void;
}

function Sidebar({ onSidebarToggle }: SidebarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
    onSidebarToggle(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    onSidebarToggle(false);
  };

  const menuItems = [
    { to: "/NIEUUDASH", label: "NIEUUDASH", icon: "./home.png" },
    { to: "/NIEUPROCURE", label: "NIEUPROCURE", icon: "./Shopping Cart.png" },
    { to: "/NIEUSTOCK", label: "NIEUSTOCK", icon: "./Boxes.png" },
    { to: "/NIEUMATRIX", label: "NIEUMATRIX", icon: "./Boxes.png" },
    { to: "/NIEUSET", label: "NIEUSET", icon: "./Request Service.png" },
    { to: "/NIEUMANAGE", label: "NIEUMANAGE", icon: "./Admin Settings Male.png" },
    { to: "/NIEUADMIN", label: "NIEUADMIN", icon: "./Secure.png" },
    { to: "/NIEUCOMS", label: "NIEUCOMS", icon: "./Communication.png" },
    { to: "/NIEUGAURD", label: "NIEUGAURD", icon: "./Settings.png" },
    { to: "/NIEUWORKFORCE", label: "NIEUWORKFORCE", icon: "./Flight Crew.png" },
    { to: "/NIEUZONE", label: "NIEUZONE", icon: "./Location.png" },
    { to: "/NIEUZONE_BASIC", label: "NIEUZONE BASIC", icon: "./Map Pin.png" },
    { to: "/NIEUZONE_INTERMEDIATE", label: "NIEUZONE INTERMEDIATE", icon: "./Scania.png" },
    { to: "/NIEUZONE_ADVANCE", label: "NIEUZONE ADVANCE", icon: "./3D Object.png" },
    { to: "/NIEUTEMPLATE", label: "NIEUTEMPLATE", icon: "./Joomla.png" },
    { to: "/NIEUCAL", label: "NIEUCAL", icon: "./Calendar.png" },
    { to: "/NIEUFINANCE", label: "NIEUFINANCE", icon: "./Bribery.png" },
  ];

  return (
    <div
      className={`sidebar bg-[#0A73BA] text-white vh-100 position-fixed ${isOpen ? 'open' : 'closed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: isOpen ? "290px" : "70px",
        overflowY: isOpen ? "auto" : "hidden",
        transition: "width 0.3s",
      }}
    >
      <div className="d-flex flex-column align-items-center py-4">
        <img
          src="./public/logo.png"
          className={`img-fluid mb-4 sidebar-logo ${isOpen ? 'open' : 'closed'}`}
          alt="logo"
          style={{
            width: isOpen ? "100px" : "50px",
            height: "auto",
            transition: "width 0.3s",
          }}
        />
      </div>
      <nav className="flex-column text-center">
        <ul className="flex-column mb-auto px-2">
          {menuItems.map(({ to, label, icon }) => (
            <li key={to} className="flex items-center space-x-4 mb-1">
              <Link
                to={to}
                className={`flex items-center ${location.pathname === to ? "active-link" : ""}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                <img
                  src={icon}
                  alt={label}
                  className="me-2"
                  style={{
                    width: isOpen ? '30px' : '23px',
                    height: isOpen ? '30px' : '23px',
                    transition: 'width 0.3s, height 0.3s',
                  }}
                />
                {isOpen && <h5 className="text-white font-medium font-open-sans mb-0">{label}</h5>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
