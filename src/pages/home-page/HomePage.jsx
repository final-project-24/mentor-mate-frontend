
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
      <div className="flex flex-col md:grid grid-cols-2 md:gap-2 lg:justify-between ">
        <div className="w-full   lg:w-1/5 ">
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

        <div className="w-full lg:w-1/5 ">
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

        <div className="w-full  lg:w-1/5 ">
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

        <div className="w-full  lg:w-1/5 ">
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
      <div className="flex flex-col items-center  ">
        <div className="w-full lg:w-1/5 mx-auto pb-5 ">
          <label htmlFor="description"></label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            className="p-1 w-full h-10 border border-gray-300 rounded"
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

      return "Welcome to MentorMate - Your Gateway to Growth and Success!";

    }
    return user.role === "mentor" ? "Welcome Mentor" : "Welcome Mentee";
  };

  const userNameDisplay = () => {
    if (!isLoggedIn) {
      return "";
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
      <section
        id="home"
        className="mt-[150px] lg:mt-[200px]  border border-blue-500  bg-primary"
      >
        <h1 className="text-xl text-center text-accent">
          {getWelcomeMessage()}
        </h1>


        {!isLoggedIn && (
          <div className="mx-20">
            <div>
              <h2 className="text-xl text-center pt-5 pb-2">
                Enjoy Your Journey
              </h2>
              <ul className="list-disc list-inside text-center">
                <li>Personalized mentorship matching</li>
                <li>Expert guidance from vetted professionals</li>
                <li>Flexible scheduling options</li>
                <li>Access to a vibrant community</li>
                <li>Extensive library of resources</li>
              </ul>
            </div>
          </div>
        )}


        <p className="text-2xl text-center text-neutral py-4">
          {userNameDisplay()}
        </p>

        {isLoggedIn && (
          <div className=" lg:mx-auto border border-red-500">
            <div className="flex flex-col-reverse lg:px-20  border border-red-500">
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

        {isLoggedIn && user.role === "mentee" && (
          <h2 className="text-center pb-2">
            Already know your mentor? 
          </h2>
        )}


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

