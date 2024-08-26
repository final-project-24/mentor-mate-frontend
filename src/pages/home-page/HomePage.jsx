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
      return "Welcome to MentorMate- Your Gateway to Growth and Success!";
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
        className="mt-[200px]  border border-blue-500 h-screen"
      >
        <h1 className="text-3xl text-center text-accent">
          {getWelcomeMessage()}
        </h1>

        {!isLoggedIn && (
          <div className="mx-10">
            <div className="">
              <h2 className="">Transform Your Journey with Mentorship</h2>
              <div className="">
                <p>
                  At MentorMate, we're dedicated to transforming the way you
                  connect with mentors and mentees. Our platform is designed to
                  foster meaningful relationships that drive personal and
                  professional development. Whether you're seeking guidance,
                  sharing your expertise, or both, MentorMate is here to support
                  your journey.
                </p>
              </div>

              <div className="">
                <h2 className="">Discover Your Path</h2>
                <div className="">
                  <p>
                    Explore a world of opportunities with personalized
                    mentorship matching. Our advanced algorithm connects you
                    with mentors or mentees who align with your goals,
                    interests, and expertise. Find the perfect match to guide
                    you through your next big step.
                  </p>
                </div>
              </div>

              <div className="">
                <h2 className="">Experience Expert Guidance</h2>
                <div className="">
                  <p>
                    Gain valuable insights from experienced professionals in
                    your field. Our mentors are carefully vetted and come with a
                    wealth of knowledge to help you navigate challenges, seize
                    opportunities, and achieve your dreams.
                  </p>
                </div>
              </div>

              <div className="">
                <h2 className="">Enjoy Flexible Scheduling</h2>
                <div className="">
                  <p>
                    Life is dynamic, and so is our scheduling. Choose times that
                    work for you, and connect with your mentor or mentee at your
                    convenience. Whether you prefer brief check-ins or in-depth
                    discussions, we accommodate your needs.
                  </p>
                </div>
              </div>

              <div className="">
                <h2 className="">Join a Thriving Community</h2>
                <div className="">
                  <p>
                    Be part of a vibrant network of learners and leaders. Share
                    your experiences, gain new perspectives, and build lasting
                    connections within our supportive community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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
            Already know your mentor? Select your appointment
          </h2>
        )}

        {isLoggedIn && (
          <div className="flex-1 lg:w-3/4 mx-auto border border-red-500 h-[500px]">
            <Schedule />
            </div>
          
            )
        }
      </section>
    </Layout>
  );
}

export default HomePage;

