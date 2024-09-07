import React, { useState } from "react";
import "./Search.css";
import SearchBar from "../../components/search-bar/SearchBar";
import SearchAllMentors from "../../components/search-all-mentors/SearchAllMentors";
import MentorList from "../../components/mentor-list/MentorList";

const Search = () => {
  return (
    <section id="search">
      <h2>Search for a Mentor or Skill</h2>
      <div className="search-card">
        <SearchBar />
        {/* <SearchAllMentors  /> */}
      </div>
      <div className="mentor-list-container">
        <MentorList />
      </div>
    </section>
  );
};

export default Search;
