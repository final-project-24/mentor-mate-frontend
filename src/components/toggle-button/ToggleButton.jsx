// // src/components/toggleButton/ToggleButton.jsx
// import React, { useState } from "react";
// // import "./ToggleButton.css";

// const ToggleButton = ({ onToggle, buttonName, className }) => {
//   return (
//     <button onClick={onToggle} className={className}>
//       {buttonName}
//     </button>
//   );
// };

// export default ToggleButton;

// src/components/toggle-button/ToggleButton.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ToggleButton.css";

const ToggleButton = ({
  onToggle,
  isClicked,
  iconClicked,
  iconUnClicked,
  icon,
  buttonName,
  className,
}) => {
  const renderIcon = () => {
    if (icon) {
      return <FontAwesomeIcon icon={icon} />;
    } else if (iconClicked && iconUnClicked) {
      return <FontAwesomeIcon icon={isClicked ? iconClicked : iconUnClicked} />;
    } else {
      return null; // No icon
    }
  };

  return (
    <button onClick={onToggle} className={className}>
      {buttonName}
      {renderIcon()} 
    </button>
  );
};

export default ToggleButton;
