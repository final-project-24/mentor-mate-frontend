import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoutButton from "../logout/Logout.jsx";
import LoginButton from "../login-button/LoginButton.jsx";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/images/mentormateLogo.svg";
import LogoSmall from "../../assets/images/icon.svg";
import "./Header.css";

const Header = () => {
  const [nav, setNav] = useState(false);
  const { isLoggedIn, user } = useAuthContext(); // Use user object from context
  const location = useLocation();
  
const isDashboardActive = location.pathname === "/dashboard";

  // Define navigation links based on user role
  const guestLinks = [
    { to: "/", label: "Why We?" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
  ];

  const mentorLinks = [
    { to: "/", label: "Why We?" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const menteeLinks = [
    { to: "/", label: "Why We?" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const adminLinks = [
    { to: "/", label: "Why We?" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/why-we", label: "Why We?" },
  ];

  // Determine the navigation links to display
  const navLinks = !isLoggedIn
    ? guestLinks
    : user?.role === "admin"
    ? adminLinks
    : user?.role === "mentor"
    ? mentorLinks
    : user?.role === "mentee"
    ? menteeLinks
    : [];

  const handleClick = () => setNav(!nav);
  const closeMenu = () => setNav(false);

  const getNavClasses = () => {
    if (isLoggedIn && isDashboardActive) {
      return "hidden lg:flex flex-grow gap-2 text-sm lg:text-[22px] lg:ml-[250px] xl:justify-center lg:justify-start lg:items-center";
    }
    return "hidden lg:flex flex-grow gap-2 text-sm lg:text-base xl:text-lg lg:justify-center lg:items-center";
  };

  return (
    <div id="header">
      <nav className="header-container bg-[#d7e1d6eb] fixed top-0 w-full h-[80px] flex flex-row lg:grid lg:grid-cols-[250px_auto_250px] lg:w-screen px-4 md:px-6 lg:px-0 z-50">
        {/* Logo Section */}
        <div
          className={`flex items-center ${
            nav ? "absolute  z-50" : "lg:justify-start"
          }p-1 `}
        >
          <Link
            to={isLoggedIn ? "/dashboard" : "/"}
            className="text-xl font-bold text-black hover:text-neutral"
          >
            <img
              src={Logo}
              alt="Logo"
              className="hidden lg:grid lg:w-[250px] lg:px-2 h-[80px] py-2"
            />
            <img
              src={LogoSmall}
              alt="Logo Small"
              className="w-[80px] p-1 md:w-[80px] md:p-2 lg:hidden"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className={getNavClasses()}>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? "text-neutral" : "hover:text-neutral"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Login/Logout Button */}
        <div
          className={`ml-auto flex items-center w-[250px] ${
            nav ? "hidden" : "lg:flex"
          }`}
        >
          {!isLoggedIn ? (
            <Link
              to="/authentication"
              className="hidden lg:flex lg:w-[250px] lg:px-5 lg:justify-end pt-2"
            >
              <LoginButton />
            </Link>
          ) : (
            <div className="hidden lg:flex lg:w-[250px] lg:px-5 lg:justify-end pt-2">
              <LogoutButton />
            </div>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden flex items-center ml-auto">
          <button
            onClick={handleClick}
            className="z-50 cursor-pointer text-accent"
            aria-controls="mobile-menu"
            aria-expanded={nav ? "true" : "false"}
            aria-label="Toggle navigation menu"
          >
            {!nav ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        {/* Mobile Menu */}
        {nav && (
          <div
          id="blurring"
            className="fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] flex z-10">
            {/* Blurred 1/4 screen overlay */}
            <div
              className="w-1/4  backdrop-blur-sm z-50 "
              onClick={closeMenu}
            ></div>
            {/* Menu taking up 3/4 of the screen */}
            <ul
              id="mobile-menu"
              className="w-3/4 bg-[#d7e1d6] text-gray-700 flex flex-col pt-[100px] items-center"
            >
              {navLinks.map(({ to, label }) => (
                <li
                  key={to}
                  className="text-lg text-center py-2 hover:text-gray-700 mb-2 w-full px-6"
                  onClick={closeMenu}
                >
                  <Link to={to}>{label}</Link>
                </li>
              ))}
              {!isLoggedIn ? (
                <li onClick={closeMenu}>
                  <Link
                    to="/authentication"
                    className="text-primary bg-accent rounded-2xl p-2"
                  >
                    <LoginButton />
                  </Link>
                </li>
              ) : (
                <li onClick={closeMenu}>
                  <LogoutButton />
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
