import { useDarkModeContext } from "../../store/dark-mode-context/DarkModeContext";
import "./ChangeAppearance.css";

const ChangeAppearanceButton = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <button className="change-appearance-button" onClick={toggleDarkMode}>
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

export default ChangeAppearanceButton;