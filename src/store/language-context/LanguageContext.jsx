import { createContext, useContext, useState } from "react";
// import englishLayoutData from "../../assets/data/layoutDataEnglish.json";
// import germanLayoutData from "../../assets/data/layoutDataGerman.json";
// import englishProfileData from "../../assets/data/profileDataEnglish.json";
// import germanProfileData from "../../assets/data/profileDataGerman.json";
// import englishContactData from "../../assets/data/contactDataEnglish.json";
// import germanContactData from "../../assets/data/contactDataGerman.json";
import englishTermsData from "../../assets/data/termsDataEnglish.json";
import germanTermsData from "../../assets/data/termsDataGerman.json";
import englishSettingsData from "../../assets/data/settingsDataEnglish.json";
import germanSettingsData from "../../assets/data/settingsDataGerman.json";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const initialLanguage = localStorage.getItem("language") || "eng";

  // const [layoutData, setLayoutData] = useState(
  //   initialLanguage === "eng" ? englishLayoutData : germanLayoutData
  // );

  // const [profileData, setProfileData] = useState(
  //   initialLanguage === "eng" ? englishProfileData : germanProfileData
  // );

  // const [contactData, setContactData] = useState(
  //   initialLanguage === "eng" ? englishContactData : germanContactData
  // );

  const [termsData, setTermsData] = useState(
    initialLanguage === "eng" ? englishTermsData : germanTermsData
  );

  const [settingsData, setSettingsData] = useState(
    initialLanguage === "eng" ? englishSettingsData : germanSettingsData
  );

  // console.log("Initial Language:", initialLanguage); //
  // console.log("Profile Data:", profileData); //
  // console.log("Contact Data:", contactData); //
  // console.log("Terms Data:", termsData); //
  // console.log("Settings Data:", settingsData); //

  const switchToEnglish = () => {
    // setLayoutData(englishLayoutData);
    // setProfileData(englishProfileData);
    // setContactData(englishContactData);
    setTermsData(englishTermsData);
    setSettingsData(englishSettingsData);
    localStorage.setItem("language", "eng");
  };

  const switchToGerman = () => {
    // setLayoutData(germanLayoutData);
    // setProfileData(germanProfileData);
    // setContactData(germanContactData);
    setTermsData(germanTermsData);
    setSettingsData(germanSettingsData);
    localStorage.setItem("language", "ger");
  };

  return (
    <LanguageContext.Provider
      value={{
        // layoutData,
        // profileData,
        // contactData,
        termsData,
        settingsData,
        switchToEnglish,
        switchToGerman,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguageContext = () => useContext(LanguageContext);
