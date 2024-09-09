import React, { useState } from "react";
import { Link } from "react-router-dom";
import ToggleButton from "../toggle-button/ToggleButton"; // Adjust the import path as necessary
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./DevNav.css";

export default function DevNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dev-nav-container">
      <ToggleButton
        onToggle={toggleDropdown}
        isClicked={isOpen}
        iconClicked={faChevronUp}
        iconUnClicked={faChevronDown}
        buttonName="Dev Nav "
        className="button-type-link"
      />
      {isOpen && (
        <ul className="dropdown-menu">
          <li>
            <Link to="/playground">Playground</Link>
          </li>
          <li>
            <Link to="/booking/:id">Booking</Link>
          </li>
          <li>
            <Link to="/session-preview">Session Preview</Link>
          </li>
          <li>
            <Link to="/feedback">Feedback</Link>
          </li>
          <li>
            <Link to="/terms">Terms</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
