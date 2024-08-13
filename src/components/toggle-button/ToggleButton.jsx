// src/components/toggleButton/ToggleButton.jsx
import React, { useState } from "react";

const ToggleButton = ({ onToggle, buttonName }) => {
  return <button onClick={onToggle}>{buttonName}</button>;
};

export default ToggleButton;
