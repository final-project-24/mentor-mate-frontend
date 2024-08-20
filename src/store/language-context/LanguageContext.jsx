import { createContext, useState } from "react";
// import englishLayoutData from "../../assets/data/layoutDataEnglish.json";
// import germanLayoutData from "../../assets/data/layoutDataGerman.json";
// import englishProfileData from "../../assets/data/profileDataEnglish.json";
// import germanProfileData from "../../assets/data/profileDataGerman.json";
// import englishContactData from "../../assets/data/contactDataEnglish.json";
// import germanContactData from "../../assets/data/contactDataGerman.json";
import englishTermsData from "../../assets/data/termsDataEnglish.json";
import germanTermsData from "../../assets/data/termsDataGerman.json";

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

  console.log("Initial Language:", initialLanguage); //
  // console.log("Profile Data:", profileData); //
  // console.log("Contact Data:", contactData); //
  console.log("Terms Data:", termsData); //

  const switchToEnglish = () => {
    // setLayoutData(englishLayoutData);
    // setProfileData(englishProfileData);
    // setContactData(englishContactData);
    setTermsData(englishTermsData);
    localStorage.setItem("language", "eng");
  };

  const switchToGerman = () => {
    // setLayoutData(germanLayoutData);
    // setProfileData(germanProfileData);
    // setContactData(germanContactData);
    setTermsData(germanTermsData);
    localStorage.setItem("language", "ger");
  };

  return (
    <LanguageContext.Provider
      value={{
        // layoutData,
        // profileData,
        // contactData,
        termsData,
        switchToEnglish,
        switchToGerman,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
