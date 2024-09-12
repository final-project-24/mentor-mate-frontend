// DashboardSidebar.jsx
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import {
  faBars,
  faTimes,
  faSearch,
  faCalendarAlt,
  faChalkboardTeacher,
  faCog,
  faTools,
  faUser,
  faChartLine,
  faTrashAlt,
  faSliders
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import "./DashboardSidebar.css";
import ToggleButton from "../toggle-button/ToggleButton";
import DevNav from "../dev-nav/DevNav";

export default function DashboardSidebar() {
  const { user } = useAuthContext(); // Use useAuthContext hook to access user state
  const [isClicked, setIsClicked] = useState(false); // State to manage sidebar open/close
  const [activeLink, setActiveLink] = useState(""); // State to manage active link
  const sidebarRef = useRef(null); // Reference to sidebar element to detect click outside
  const location = useLocation(); // Get current location to set active link

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]); // Set active link on location change

  const toggleSidebar = () => {
    setIsClicked(!isClicked);
  }; // Toggle sidebar open/close

  const closeSidebar = () => {
    setIsClicked(false);
  }; // Close sidebar when a link is clicked

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      closeSidebar();
    }
  }; // Close sidebar when clicked outside

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Add event listener to detect click outside

  return (
    <>
      <div
        ref={sidebarRef}
        className={`dashboard-sidebar ${isClicked ? "open" : ""}`}
      >
        <ToggleButton
          onToggle={toggleSidebar}
          isClicked={isClicked}
          iconClicked={faTimes}
          iconUnClicked={faBars}
          className={`sidebar-toggle-button   ${isClicked ? "open" : ""}`}
        />
        <nav className="dashboard-sidebar-nav ">
          <ul>
            <li title={isClicked ? '' : 'Your Profile'}>
              <Link
                to="/dashboard#top"
                onClick={closeSidebar}
                className={activeLink === "/dashboard" ? "active" : ""}
              >
                Your Profile
                <FontAwesomeIcon icon={faUser} className="fa-icon" />
              </Link>
            </li>
            {user && user.role === "mentee" && (
              <li title={isClicked ? '' : 'Search'}>
                <Link
                  to="/dashboard/search#top"
                  onClick={closeSidebar}
                  className={activeLink === "/dashboard/search" ? "active" : ""}
                >
                  Search for a Mentor
                  <FontAwesomeIcon icon={faSearch} className="fa-icon" />
                </Link>
              </li>
            )}
            <li title={isClicked ? '' : 'Schedule'}>
              <Link
                to="/dashboard/schedule#top"
                onClick={closeSidebar}
                className={activeLink === "/dashboard/schedule" ? "active" : ""}
              >
                Book a Session
                <FontAwesomeIcon icon={faCalendarAlt} className="fa-icon" />
              </Link>
            </li>
            {user &&
              user.role === "mentor" && ( // Add null check for user
                <li title={isClicked ? '' : 'Delete Sessions'}>
                  <Link
                    to="/dashboard/delete-sessions#top"
                    onClick={closeSidebar}
                    className={
                      activeLink === "/dashboard/delete-sessions"
                        ? "active"
                        : ""
                    }
                  >
                    Delete Sessions
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="fa-icon"
                    />{" "}
                    {/* Use trash icon */}
                  </Link>
                </li>
              )}
            <li title={isClicked ? '' : 'Upcoming Sessions'}>
              <Link
                to="/dashboard/session#top"
                onClick={closeSidebar}
                className={activeLink === "/dashboard/session" ? "active" : ""}
              >
                Upcoming Sessions
                <FontAwesomeIcon
                  icon={faChalkboardTeacher}
                  className="fa-icon"
                />
              </Link>
            </li>
            <li title={isClicked ? '' : 'Your Progress'}>
              <Link
                to="/dashboard/session-history#top"
                onClick={closeSidebar}
                className={
                  activeLink === "/dashboard/session-history" ? "active" : ""
                }
              >
                Your Progress
                <FontAwesomeIcon icon={faChartLine} className="fa-icon" />
              </Link>
            </li>
            <li title={isClicked ? '' : 'Settings'}>
              <Link
                to="/dashboard/settings#top"
                onClick={closeSidebar}
                className={activeLink === "/dashboard/settings" ? "active" : ""}
              >
                Settings
                <FontAwesomeIcon icon={faCog} className="fa-icon" />
              </Link>
            </li>
            {user?.role === "mentor" && (
              <li title={isClicked ? '' : 'Manage skills'}>
                <Link
                  to="/dashboard/mentor-skills#top"
                  onClick={closeSidebar}
                  className={
                    activeLink === "/dashboard/admin-tools" ? "active" : ""
                  }
                >
                  Manage Skills
                  <FontAwesomeIcon icon={faSliders} className="fa-icon" />
                </Link>
              </li>
            )}
            {user?.role === "admin" && (
              <li title={isClicked ? '' : 'Admin Tools'}>
                <Link
                  to="/dashboard/admin-tools#top"
                  onClick={closeSidebar}
                  className={
                    activeLink === "/dashboard/admin-tools" ? "active" : ""
                  }
                >
                  Admin Tools
                  <FontAwesomeIcon icon={faTools} className="fa-icon" />
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <DevNav />
      </div>
    </>
  );
}
