import { useState } from "react";
import axios from "axios";
import ToggleButton from "../toggle-button/ToggleButton";

const SearchBySkill = ({
  categoryOptions = [],
  titleOptions = [],
  levelOptions = [],
  languageOptions = [],
  onSearchResults,
}) => {
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
    <div className=" pt-5 pb-20  lg:w-[70vw] ">
      <div className="w-full flex flex-col md:grid grid-cols-2 md:gap-2 ">
        <div className="mb-3 border">
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

        <div className="mb-3 border">
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

        <div className="mb-3 border">
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

        <div className="mb-3 border">
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

      <div className="flex flex-col items-center">
        <div className="w-full mx-auto pb-5 md:w-2/4">
          <label htmlFor="description"></label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            className="p-1 w-full h-10 border border-gray-300 rounded "
          />
        </div>

        <ToggleButton
          onToggle={handleSearch}
          buttonName="Search Mentor"
          className="p-1 border border-accent bg-accent rounded-lg text-white"
        />
      </div>
    </div>
  );
};

export default SearchBySkill;
