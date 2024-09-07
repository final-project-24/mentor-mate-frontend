import { useEffect, useState } from "react";
import { fetchUsers } from "../../utils/api-connector";
import { useBookingContext } from "../../store/booking-context/BookingContext";

const SearchAllMentors = () => {
  const [mentors, setMentors] = useState([]);
  const { setMentors: setContextMentors } = useBookingContext();

  useEffect(() => {
    // Fetch users from the API and filter mentors
    const getMentors = async () => {
      try {
        const users = await fetchUsers();
        console.log("All Mentors:", users); // Log fetched users in component
        const mentorsData = users.filter((user) => user.role === "mentor"); // Adjust the filter condition as needed
        setMentors(mentorsData); // Set the mentors in local state
        console.log("Filtered mentors:", mentorsData); // Log filtered mentors
      } catch (error) {
        console.error("❌ Error retrieving mentors:", error);
      }
    };

    getMentors();
  }, []);

  const handleSelect = (e) => {
    const selectedMentorUuid = e.target.value;
    const selectedMentor = mentors.find((mentor) => mentor.uuid === selectedMentorUuid);
    setContextMentors([selectedMentor]); // Set the selected mentor in the context
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center">
        Please select a mentor to view their availability:
      </h2>

      <select onChange={handleSelect}
        className="w-1/2 p-1"
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
            className="text-center"
          >
            {mentor.userName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchAllMentors;
