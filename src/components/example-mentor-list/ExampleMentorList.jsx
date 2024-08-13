import React, { useEffect, useState } from "react";
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
    <div>
      <h2>Select a Mentor</h2>
      <ul>
        {mentors.map((mentor, index) => (
          <li
            key={`${mentor._id}-${index}`}
            onClick={() => {
              console.log(`Selected mentor object:`, mentor); // Debugging log
              onSelect(mentor._id);
            }}
          >
            {mentor.userName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleMentorList;
