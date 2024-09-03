import { useEffect, useState } from "react";
import { fetchUsers } from "../../utils/api-connector";
import MentorAvailabilityCalendar from "../../components/mentor-availability-calendar/MentorAvailabilityCalendar";


const ExampleMentorList = ({ onSelect }) => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => {
    const getMentors = async () => {
      try {
        const users = await fetchUsers();
        console.log("Fetched users in ExampleMentorList:", users);
        const mentorsData = users.filter((user) => user.role === "mentor");
        setMentors(mentorsData);
        console.log("Filtered mentors:", mentorsData);
      } catch (error) {
        console.error("❌ Error retrieving mentors:", error);
      }
    };

    getMentors();
  }, []);

  const handleSelectMentor = (mentorId) => {
    const mentor = mentors.find((m) => m.uuid === mentorId);
    setSelectedMentor(mentor);
    onSelect(mentorId);
  };

  return (
    <div
      className={`dropdown-container ${
        selectedMentor ? "expanded-height" : "default-height"
      }`}
    >
      <select
        onChange={(e) => handleSelectMentor(e.target.value)}
        className="dropdown-select"
        defaultValue=""
      >
        <option value="" disabled className="text-center">
          Choose a mentor
        </option>
        {mentors.map((mentor, index) => (
          <option
            key={`${mentor.uuid}-${index}`}
            value={mentor.uuid}
            className="text-center"
          >
            {mentor.userName}
          </option>
        ))}
      </select>

    </div>
  );
};

export default ExampleMentorList;
