import { useEffect, useState } from "react";
import { useLanguageContext } from "../../store/language-context/LanguageContext";
import "./LanguageButton.css";

export default function LanguageButton() {
  const { switchToEnglish, switchToGerman } = useLanguageContext();
  const [activeLanguage, setActiveLanguage] = useState("eng");

  console.log("Active Language:", activeLanguage); //
  console.log("Switch to English:", switchToEnglish); //
  console.log("Switch to German:", switchToGerman); //

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setActiveLanguage(storedLanguage);
    }
  }, []);

  const handleEnglishClick = () => {
    switchToEnglish();
    setActiveLanguage("eng");
  };

  const handleGermanClick = () => {
    switchToGerman();
    setActiveLanguage("ger");
  };

  return (

    <div>
      <div className="language-button-container">

        <button
          className={`eng-button ${activeLanguage === "eng" ? "active" : ""}`}
          onClick={handleEnglishClick}
        >
          Eng
        </button>
        <button
          className={`ger-button ${activeLanguage === "ger" ? "active" : ""}`}
          onClick={handleGermanClick}
        >
          Ger
        </button>
      </div>
    </div>
  );
}
