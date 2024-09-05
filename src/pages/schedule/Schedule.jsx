import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import { useBookingContext } from "../../store/booking-context/BookingContext";
// import { ClipLoader } from "react-spinners";
// import { Link } from "react-router-dom";
import "./Schedule.css";
import Loading from "../../components/loading/Loading";
import NotLoggedInMessage from "../../components/not-logged-in-message/NotLoggedInMessage";
import Layout from "../../components/layout/Layout";
// import LoginButton from "../../components/login-button/LoginButton";
import MentorAvailabilityCalendar from "../../components/mentor-availability-calendar/MentorAvailabilityCalendar";
import SearchAllMentors from "../../components/search-all-mentors/SearchAllMentors";

export default function Schedule() {
  const { loading, user } = useAuthContext(); // Use useAuthContext hook to access user information
  // const [selectedMentorUuid, setSelectedMentorUuid] = useState(null);
  const { selectedMentorUuid } = useBookingContext();

  // // Function to handle mentor selection
  // const handleMentorSelect = (mentorUuid) => {
  //   console.log(`Selected mentor UUID: ${mentorUuid}`);
  //   setSelectedMentorUuid(mentorUuid);
  // };

  // If the page is still loading, display a loading indicator
  if (loading) {
    return <Loading />;
  }

  // If the user is not logged in, display a message to prompt them to log in
  if (!user) {
    return (
      <Layout>
        <NotLoggedInMessage />
      </Layout>
    );
  }

  return (
    <section id="booking-container">
      {/* <h1>Booking</h1> */}
      {user.role === "admin" && (
        <div>
          <p>Please change your role to mentee or mentor to view this page.</p>
          <Link to="/dashboard/admin-tools">Admin Dashboard</Link>
        </div>
      )}
      {/* {user.role === "mentee" && (
        // <h1>Schedule a Meeting</h1>
        // {user.role === "mentee" && !selectedMentorUuid && (

        // <h1>Schedule a Meeting</h1>
        //{user.role === "mentee" && !selectedMentorUuid && ( */}
      {user.role === "mentee" && !selectedMentorUuid && (
        <div>
          <p>Please select a mentor to view their availability.</p>
        </div>
      )}
      {/* <div> */}
        {/* <p className="text-center">Please select a mentor to view their availability:</p> */}
        {/* Add a mentor selection component here */}
        {/* For example: <MentorList onSelect={handleMentorSelect} /> */}
        {/* <SearchAllMentors onSelect={handleMentorSelect} /> */}
      {/* </div> */}
      {/* )} */}
      {user.role === "mentor" && (
        <p>Manage your availability on calendar below:</p>
      )}
      {(selectedMentorUuid || user.role === "mentor") && (
        <MentorAvailabilityCalendar
          mentorUuid={selectedMentorUuid || user.id} // i dont think we need user.id
          userRole={user.role}
        />
      )}
      {/* <p>end of page</p> */}
    </section>
  );
}
