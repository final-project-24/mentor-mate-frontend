import  { useState } from "react";
import "./Search.css";
import SearchBar from "../../components/search-bar/SearchBar";
import SearchAllMentors from "../../components/search-all-mentors/SearchAllMentors";
import MentorList from "../../components/mentor-list/MentorList";
import SearchBySkill from '../../components/search-by-skill/SearchBySkill.jsx'

const Search = () => {
  return (
    <section id="search" className="pt-[80px]">
      <h2 className="text-accent">Search for a Mentor </h2>
      <div className="search-card">
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
