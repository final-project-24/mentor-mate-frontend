import { useDarkModeContext } from "../../store/dark-mode-context/DarkModeContext";
import { useLanguageContext } from "../../store/language-context/LanguageContext.jsx";
import "./ChangeAppearance.css";

const ChangeAppearanceButton = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();
  const { settingsData } = useLanguageContext();

  return (
    <button className="change-appearance-button" onClick={toggleDarkMode}>
      {isDarkMode ? settingsData.switchToLightMode : settingsData.switchToDarkMode}
    </button>
  );
};

export default ChangeAppearanceButton;