import  { useState } from "react";
import "./Search.css";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import Loading from "../../components/loading/Loading";
import NotLoggedInMessage from "../../components/not-logged-in-message/NotLoggedInMessage";
import SearchBar from "../../components/search-bar/SearchBar";
import SearchAllMentors from "../../components/search-all-mentors/SearchAllMentors";
import MentorList from "../../components/mentor-list/MentorList";
import SearchBySkill from '../../components/search-by-skill/SearchBySkill.jsx'

const Search = () => {
  const { user, loading } = useAuthContext();

  console.log("Hey there! I'm the Search Page."); // Debug log

  // If the page is still loading, display a loading indicator
  if (loading) {
    return <Loading />;
  }

  // If the user is not logged in, display a message to prompt them to log in
  if (!user) {
    return <NotLoggedInMessage />;
  }

  return (
    <section id="search" className="pt-[90px]  ">
      <h2 className="text-accent">Search for a Mentor </h2>
      <div className="search-card md:w-[90%]">
        <SearchBar />
        {/* <SearchAllMentors  /> */}
      </div>
      <div className="mentor-list-container">
        <MentorList />
      </div>

      <h2 className="text-accent text-center text-xl">or Skill</h2>
      <div> < SearchBySkill /> </div>
    </section>
  );
};

export default Search;
