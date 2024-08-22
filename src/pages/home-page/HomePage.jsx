import "./HomePage.css";
import { useState } from "react";
import Layout from "../../components/layout/Layout";

import ReviewSidebar from "../review-sidebar/ReviewSidebar";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import Schedule from "../schedule/Schedule";
import InfoCard from "../../components/info-card/InfoCard.jsx";
import ToggleButton from "../../components/toggle-button/ToggleButton.jsx";


// Define the SearchComponent separately or before usage
function SearchComponent({
  categoryOptions,
  titleOptions,
  levelOptions,
  languageOptions,
  descriptionOptions,
}) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");

  const handleSearch = () => {
    const searchCriteria = {
      category,
      title,
      level,
      language,
      description,
    };
    onSearch(searchCriteria);
  };

  return (
    <>
    
      <div className="flex justify-between ">
        <div className="w-1/5 ">
          <label htmlFor="dropdown1"></label>
          <select
            id="dropdown1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-1"
          >
            <option value="">Search by Category:</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/5 ">
          <label htmlFor="dropdown2"></label>
          <select
            id="dropdown2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-1"
          >
            <option value="">Search by Title:</option>
            {titleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/5 ">
          <label htmlFor="dropdown3"></label>
          <select
            id="dropdown3"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="p-1"
          >
            <option value="">Search by Level:</option>
            {levelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/5 ">
          <label htmlFor="dropdown4"></label>
          <select
            id="dropdown4"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-1"
          >
            <option value="">Search by Language:</option>
            {languageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <div className="w-1/5 mx-auto p-2">
          <label htmlFor="description"></label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            className="p-1 w-full border border-gray-300 rounded"
          />
        </div>

        <ToggleButton
          onToggle={handleSearch}
          buttonName="Search Mentor"
          className="mx-auto"
        />
      </div>
    </>
  );
}



const HomePage = () => {

  const { user, isLoggedIn } = useAuthContext();

  const getWelcomeMessage = () => {
    if (!isLoggedIn) {
      return "Welcome to MentorMate";
    }
    return user.role === "mentor" ? "Welcome Mentor" : "Welcome Mentee";
  };

  const userNameDisplay = () => {
    if (!isLoggedIn) {
      return "Your learning platform";
    }
    return user.userName;
  };

  // Define options for dropdowns
  const categoryOptions = ["Option 1A", "Option 1B", "Option 1C"];
  const titleOptions = ["Option 2A", "Option 2B", "Option 2C"];
  const levelOptions = ["Option 3A", "Option 3B", "Option 3C"];
  const languageOptions = ["Option 4A", "Option 4B", "Option 4C"];

  return (
    <Layout>
      <section id="home" className="pt-[150px] mx-2">
        <h1 className="text-3xl text-center text-accent">
          {getWelcomeMessage()}
        </h1>
        <p className="text-2xl text-center text-neutral py-4">
          {userNameDisplay()}
        </p>

        {isLoggedIn && (
          <div className="items-center w-full lg:mx-auto border border-red-500">
            <div className="flex flex-col-reverse px-20 lg:w-1/2 lg:mx-auto justify-center border border-red-500">
              <InfoCard
                image={user.image}
                userName={user.userName}
                role={user.role}
                email={user.email}
              />
            </div>
            {/* Keep ReviewSidebar from nacho branch */}
            <ReviewSidebar />
          </div>
        )}

        {isLoggedIn && user.role === "mentee" && (
          <div className="p-10">
            <h2 className="text-center pb-2">Search your mentor</h2>
            <SearchComponent
              categoryOptions={categoryOptions}
              titleOptions={titleOptions}
              levelOptions={levelOptions}
              languageOptions={languageOptions}
            />
          </div>
        )}

        <h2 className="text-center pb-2">
          Already know your mentor? Select your appointment
        </h2>

        {isLoggedIn && (
          <div className="flex-1 lg:w-3/4 mx-auto border border-red-500">
            <Schedule />
          </div>
        )}
      </section>
    </Layout>
  );
};

export default HomePage;

{
  /* Uncomment and modify as needed */
}
{
  /* <section className="flex py-10">
        <div className="border border-red-500 w-1/4 h-[400px] mx-2">
          Some random comments about platform
        </div>
        <div className="border border-red-500 w-1/4 h-[400px] mx-2">
          Some random comments about platform
        </div>
        <div className="border border-red-500 w-1/4 h-[400px] mx-2">
          Some random comments about platform
        </div>
        <div className="border border-red-500 w-1/4 h-[400px] mx-2">
          Some random comments about platform
        </div>
      </section> */
}
