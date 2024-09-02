import React, { useState } from "react";
import "./Search.css";
import SearchBar from "../../components/search-bar/SearchBar";
import SearchAllMentors from "../../components/search-all-mentors/SearchAllMentors";
import MentorList from "../../components/mentor-list/MentorList";

const Search = () => {
  const [results, setResults] = useState([]);

  return (
    <section id="search">
      <h2>Search for a Mentor or Skill</h2>
      <div className="search-card">
        <SearchBar onResults={setResults} />
        {/* <SearchAllMentors onResults={setResults} /> */}
      </div>
      <div className="mentor-list-container">
        <MentorList mentors={results} />
      </div>
    </section>
  );
};

export default Search;
