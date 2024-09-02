// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { fetchMentors } from "../../utils/api-connector";
// import "./SearchBar.css";

// const SearchBar = ({ onResults }) => {
//   const [query, setQuery] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     try {
//       const results = await fetchMentors(query);
//       onResults(results);
//     } catch (error) {
//       console.error("Error fetching mentors:", error);
//     }
//   };

//   return (
//     <div className="search-bar-container">
//       <form onSubmit={handleSearch} className="search-bar">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search for mentors / skills..."
//           className="search-input"
//         />
//         <button type="submit" className="search-button">
//           {" "}
//           <FontAwesomeIcon icon={faSearch} />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState } from 'react';
import { fetchMentors } from '../../utils/api-connector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await fetchMentors({ query });
      onResults(results);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  return (
    <div className='search-bar-container'>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for mentors..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;