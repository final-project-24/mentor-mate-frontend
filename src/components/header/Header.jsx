import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "../logout/Logout.jsx";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [nav, setNav] = useState(false);
  const { isLoggedIn, user } = useAuthContext(); // Use user object from context

  useEffect(() => {
    console.log("Header - isLoggedIn:", isLoggedIn);
    console.log("Header - userRole:", user?.role); // Ensure user object exists before accessing role
  }, [isLoggedIn, user]);

  // Define navigation links based on user role
  const guestLinks = [
     { to: "/why-we", label: "Why We?" },
     { to: "/how-it-works", label: "How It Works" },
    { to: "/", label: "Home" },
    { to: "/about-us", label: "About Us" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const mentorLinks = [
    { to: "/", label: "Home" },
    // { to: "/my-account", label: "My Account" },
    // { to: "/my-schedule", label: "My Schedule" },
    // { to: "/settings", label: "Settings" },
    // { to: "/session", label: "Session" },
    // { to: "/feedback", label: "Feedback" },
    { to: "/about-us", label: "About Us" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/dashboard", label: "Dashboard" },
    // { to: "/playground", label: "(Playground)" },
  ];

  const menteeLinks = [
    { to: "/", label: "Home" },
    // { to: "/my-account", label: "My Account" },
    // { to: "/my-calendar", label: "My Calendar" },
    // { to: "/my-classes", label: "My Classes" },
    { to: "/about-us", label: "About Us" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/dashboard", label: "Dashboard" },
    // { to: "/playground", label: "(Playground)" },
  ];

  // Determine the navigation links to display
  const navLinks = !isLoggedIn
    ? guestLinks
    : user?.role === "mentor"
    ? mentorLinks
    : user?.role === "mentee"
    ? menteeLinks
    : [];

  const handleClick = () => setNav(!nav);
  const closeMenu = () => setNav(false);

  return (
    <nav className=" fixed top-0 w-full h-[80px] xl:h-[100px] flex items-center px-4 md:px-6 z-50 bg-inherit border-b-2 border-accent">
      {/* Logo Section */}
      <div
        className={`flex items-center ${
          nav
            ? "absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 border"
            : "lg:justify-start"
        } flex-grow justify-center`}
      >
        <Link
          to="/"
          className="text-xl font-bold text-accent hover:text-neutral"
        >
          Mentor Mate
        </Link>
      </div>

      {/* Navigation Links for Desktop */}
      <ul
        className={`hidden lg:flex flex-grow gap-2 text-sm lg:text-lg xl:text-lg 2xl:text-xl lg:gap-3`}
      >
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? "text-accent" : "hover:text-accent"
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Login/Logout Button */}
      <div
        className={`ml-auto flex items-center ${
          nav ? "block" : "hidden lg:flex"
        }`}
      >
        {!isLoggedIn ? (
          <Link
            to="/authentication"
            className="text-primary bg-accent  p-2 hover:bg-neutral"
          >
            Mentor Mate
          </Link>
        ) : (
          <LogoutButton />
        )}
      </div>

      {/* Hamburger Icon */}
      <div className="lg:hidden flex items-center ml-auto border border-red-500">
        <button
          onClick={handleClick}
          className="z-40 cursor-pointer"
          aria-controls="mobile-menu"
          aria-expanded={nav ? "true" : "false"}
          aria-label="Toggle navigation menu"
        >
          {!nav ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      {/* Mobile Menu */}
      <ul
        id="mobile-menu"
        className={`${
          nav ? "flex" : "hidden"
        } absolute top-0 left-0 w-full h-screen bg-[#fffdfd] text-gray-700 flex-col justify-center items-center z-40`}
      >
        {navLinks.map(({ to, label }) => (
          <li
            key={to}
            onClick={closeMenu}
            className="text-lg text-center py-2 hover:text-gray-700 mb-2 w-screen px-6 border-b border-gray-300"
          >
            <Link to={to}>{label}</Link>
          </li>
        ))}
        {!isLoggedIn ? (
          <li onClick={closeMenu}>
            <Link
              to="/authentication"
              className="text-primary bg-accent rounded-2xl p-2 hover:bg-neutral"
            >
              Login
            </Link>
          </li>
        ) : (
          <LogoutButton />
        )}
      </ul>
    </nav>
  );
}
export default Header

