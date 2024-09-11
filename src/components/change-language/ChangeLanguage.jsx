import { useEffect, useState } from "react";
import { useLanguageContext } from "../../store/language-context/LanguageContext";
import "./ChangeLanguage.css";
import ToggleButton from "../toggle-button/ToggleButton";

export default function LanguageButton() {
  const { switchToEnglish, switchToGerman } = useLanguageContext();
  const [activeLanguage, setActiveLanguage] = useState("eng");
  const [showDropdown, setShowDropdown] = useState(false);

  console.log("Active Language:", activeLanguage); //
  console.log("Switch to English:", switchToEnglish); //
  console.log("Switch to German:", switchToGerman); //

  const languages = [
    { code: "eng", label: "English", switchFunction: switchToEnglish },
    { code: "ger", label: "German", switchFunction: switchToGerman },
    // Add more languages here
  ];

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setActiveLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    const language = languages.find((lang) => lang.code === selectedLanguage);
    if (language) {
      language.switchFunction();
      setActiveLanguage(selectedLanguage);
      localStorage.setItem("language", selectedLanguage);
    }
  };

  return (
    !showDropdown ? (
      <ToggleButton
        onToggle={() => setShowDropdown(true)}
        buttonName="Change Language"
        className="button-type-standard"
      />
    ) : (
      <div className="change-language-container pt-5">
        <h2>Change Language</h2>
        <select
          value={activeLanguage}
          onChange={handleLanguageChange}
          className="change-language-dropdown"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
            </option>
          ))}
        </select>
      </div>
    )
  );
}
