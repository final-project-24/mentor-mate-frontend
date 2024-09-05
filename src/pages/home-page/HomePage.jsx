
import "./HomePage.css";
import { useState } from "react";
import axios from 'axios'
import Layout from "../../components/layout/Layout";

import ReviewSidebar from "../review-sidebar/ReviewSidebar";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import Schedule from "../schedule/Schedule";
import InfoCard from "../../components/info-card/InfoCard.jsx";
import ToggleButton from "../../components/toggle-button/ToggleButton.jsx";
import WhyWe from '../why-we/WhyWe.jsx'



function SearchComponent({
  categoryOptions,
  titleOptions,
  levelOptions,
  languageOptions,
  onSearchResults,
}) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");

  const handleSearch = async () => {
    const searchCriteria = {
      skillCategoryTitle: category,
      skillTitle: title,
      proficiency: level,
      language,
      description,
    };
    
    try {
      
      const response = await axios.get("/app/user-skill/get-user-skills", {
        params: searchCriteria,
      });
      onSearchResults(response.data.skills); // Pass the results to a parent component or handle it within this component
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  return (
    <div className="">
      <div className=" w-full flex flex-col md:grid grid-cols-2 md:gap-2 lg:justify-between ">
        <div className=" mb-3 border  ">
          <label htmlFor="dropdown1"></label>
          <select
            id="dropdown1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-1 text-base w-full"
          >
            <option value="">Search by Category:</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className=" mb-3 border  ">
          <label htmlFor="dropdown2"></label>
          <select
            id="dropdown2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-1 text-base w-full"
          >
            <option value="">Search by Title:</option>
            {titleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className=" mb-3 border  ">
          <label htmlFor="dropdown3"></label>
          <select
            id="dropdown3"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="p-1 text-base w-full"
          >
            <option value="">Search by Level:</option>
            {levelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className=" mb-3 border  ">
          <label htmlFor="dropdown4"></label>
          <select
            id="dropdown4"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-1 text-base w-full"
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
          className="p-1 border border-accent bg-accent rounded-lg"
        />
      </div>
    </div>
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
      <section id="home" className="bg-primary mt-[80px]">
        <div className="">
          <h1 className="text-xl md:text-2xl  text-center text-accent">
            {getWelcomeMessage()}
          </h1>

          {!isLoggedIn && (
            <div className="">
              <div>
                <h2 className="text-lg md:text- text-center pt-5 pb-2   ">
                  Join us and connect with top industry experts to elevate your
                  skills and achieve your goals
                </h2>
                {/* <p className="text-center">we are offering you:</p>
              <ul className="list-disc list-inside text-center">
                <li>Personalized mentorship matching</li>
                <li>Expert guidance from vetted professionals</li>
                <li>Flexible scheduling options</li>
                <li>Access to a vibrant community</li>
                <li>Extensive library of resources</li>
              </ul> */}
              </div>
            </div>
          )}
        </div>

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
            {/* <ReviewSidebar /> */}
          </div>
        )}

            {isLoggedIn && user.role === "mentee" && (
              <div className="p-">
                <h2 className="text-center pb-2 text-accent text-xl">
                  Search your mentor
                </h2>
                <SearchComponent
                  categoryOptions={categoryOptions}
                  titleOptions={titleOptions}
                  levelOptions={levelOptions}
                  languageOptions={languageOptions}
                />
              </div>
            )}

            {isLoggedIn && user.role === "mentee" && (
              <div>
                <h2 className="text-center text-accent mt-4 pb-3">
                  Already know your mentor?
                </h2>
                <p className="text-center text-lg text-accent mb-2">
                  Schedule a Meeting
                </p>
              </div>
            )}

            {isLoggedIn && (
              <div className="flex-1 lg:w-3/4 mx-auto h-auto">
                <Schedule />
              </div>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default HomePage;

