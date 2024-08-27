// src/components/toggleButton/ToggleButton.jsx
import React, { useState } from "react";
// import "./ToggleButton.css";

const ToggleButton = ({ onToggle, buttonName, className }) => {
  return (
    <button onClick={onToggle} className={className}>
      {buttonName}
    </button>
  );
};

export default ToggleButton;
