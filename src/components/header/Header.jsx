import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "../logout/Logout.jsx";
import LoginButton from "../login-button/LoginButton.jsx";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from '../../assets/images/mentormateLogo.svg'
import LogoSmall from '../../assets/images/icon.svg'
import "./Header.css";

const Header = () => {
  const [nav, setNav] = useState(false);
  const { isLoggedIn, user } = useAuthContext(); // Use user object from context

  // useEffect(() => {
  //   console.log("Header - isLoggedIn:", isLoggedIn);
  //   console.log("Header - userRole:", user?.role); // Ensure user object exists before accessing role
  // }, [isLoggedIn, user]);

  // Define navigation links based on user role
  const guestLinks = [
    { to: "/", label: "Why We?" },
    { to: "/how-it-works", label: "How It Works" },
    // { to: "/", label: "Home" },
    // { to: "/about-us", label: "About Us" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    //{ to: "/dashboard", label: "Dashboard" },
  ];

  const mentorLinks = [
    //{ to: "/", label: "Home" },
    // { to: "/my-account", label: "My Account" },
    // { to: "/my-schedule", label: "My Schedule" },
    // { to: "/settings", label: "Settings" },
    // { to: "/session", label: "Session" },
    // { to: "/feedback", label: "Feedback" },
    // { to: "/about-us", label: "About Us" },
    { to: "/", label: "Why We?" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/dashboard", label: "Dashboard" },
    // { to: "/playground", label: "(Playground)" },
  ];

  const menteeLinks = [
    // { to: "/", label: "Home" },
    // { to: "/my-account", label: "My Account" },
    // { to: "/my-calendar", label: "My Calendar" },
    // { to: "/my-classes", label: "My Classes" },
    // { to: "/about-us", label: "About Us" },
    { to: "/", label: "Why We?" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/dashboard", label: "Dashboard" },
    // { to: "/playground", label: "(Playground)" },
  ];

  const adminLinks = [
    // { to: "/", label: "Home" },
    // { to: "/about-us", label: "About Us" },
    { to: "/", label: "Why We?" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/why-we", label: "Why We?" },
    // { to: "/admin-tools", label: "Admin Tools" },
    // { to: "/user-management", label: "User Management" },
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

  return (
    <div id="header">
      <nav className="header-container bg-[#d7e1d6eb] fixed top-0  w-full h-[80px] flex flex-row lg:grid lg:grid-cols-[250px_auto_250px] lg:w-screen px-4 md:px-6 lg:px-0 z-50 ">
        {/* Logo Section */}

        <div
          className={`flex items-center  ${
            nav ? "absolute w-full z-50  " : "lg:justify-start"
          } flex-grow `}
        >
          <Link
            to={isLoggedIn ? "/dashboard" : "/"}
            className="text-xl font-bold text-black hover:text-neutral "
          >
            <img
              src={Logo}
              alt=""
              className="hidden lg:grid lg:w-[250px] lg:px-2 h-[80px] py-2  "
            />
            <img
              src={LogoSmall}
              alt=""
              className="w-1/6 p-1 md:w-2/12 md:p-1    lg:hidden"
            />
          </Link>
        </div>

        {isLoggedIn ? (
          <ul
            className={`hidden lg:flex flex-grow gap-2 text-sm lg:text-[22px] lg:ml-[250px] xl:justify-center lg:justify-start lg:items-center`}
          >
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
        ) : (
          <ul
            className={`hidden lg:flex flex-grow gap-2 text-sm lg:text-base xl:text-lg  lg:justify-center  lg:items-center`}
          >
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
        )}

        {/* Login/Logout Button */}
        <div
          className={`ml-auto flex items-center w-[250px]  ${
            nav ? "hidden" : "lg:flex"
          }`}
        >
          {!isLoggedIn ? (
            <Link
              to="/authentication"
              className="hidden lg:flex lg:w-[250px] lg:px-5  lg:justify-end pt-2 "
            >
              <LoginButton />
            </Link>
          ) : (
            <div className="hidden lg:flex lg:w-[250px] lg:px-5  lg:justify-end pt-2 ">
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
          <div className="fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] flex z-40">
            {/* Blurred 1/4 screen overlay */}
            <div
              className="w-1/4 backdrop-blur-sm z-40"
              onClick={closeMenu} // Close menu on click
            ></div>
            {/* Menu taking up 3/4 of the screen */}
            <ul
              id="mobile-menu"
              className="w-3/4 bg-[#d7e1d6eb] text-gray-700 flex flex-col pt-[100px] items-center "
            >
              {navLinks.map(({ to, label }) => (
                <li
                  key={to}
                  className="text-lg text-center py-2  hover:text-gray-700 mb-2 w-full px-6 "
                  onClick={closeMenu} // Close menu on click
                >
                  <Link to={to}>{label}</Link>
                </li>
              ))}
              {!isLoggedIn ? (
                <li onClick={closeMenu}>
                  <Link
                    to="/authentication"
                    className=" text-primary bg-accent rounded-2xl p-2 "
                  >
                    <LoginButton/>
                  </Link>
                </li>
              ) : (
                <li>
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
