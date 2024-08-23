import { useEffect, useState } from "react";
import { fetchUsers } from "../../utils/api-connector";

const ExampleMentorList = ({ onSelect }) => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    // Fetch users from the API and filter mentors
    const getMentors = async () => {
      try {
        const users = await fetchUsers();
        console.log("Fetched users in ExampleMentorList:", users); // Log fetched users in component
        const mentorsData = users.filter((user) => user.role === "mentor"); // Adjust the filter condition as needed
        setMentors(mentorsData);
        console.log("Filtered mentors:", mentorsData); // Log filtered mentors
      } catch (error) {
        console.error("❌ Error retrieving mentors:", error);
      }
    };

    getMentors();
  }, []);

  return (
    <div className="flex flex-col items-center ">
      <h2 className="text-center">Select a Mentor</h2>

      <select onChange={(e) => onSelect(e.target.value)}
        className="w-1/2 p-1 "
        defaultValue=""
      >
        <option
          value="" disabled 
          className="text-center"
        >
          Choose a mentor
        </option>
        {mentors.map((mentor, index) => (
          <option key={`${mentor.uuid}-${index}`}
            value={mentor.uuid}
          className="text-center">
            {mentor.userName}
          
          </option>
        ))}
      </select>
    </div>
  );
};

      {/* <ul>
        {mentors.map((mentor, index) => (
          <li
            key={`${mentor.uuid}-${index}`}
            onClick={() => {
              console.log(`🔎 Selected mentor object:`, mentor); // Debugging log
              onSelect(mentor.uuid);
            }}
          >
            {mentor.userName}
          </li>
        ))}
      </ul> */}
    


export default ExampleMentorList;
