import React, { useState } from "react";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
// import { ClipLoader } from "react-spinners";
// import { Link } from "react-router-dom";
import "./Schedule.css";
import Loading from "../../components/loading/Loading";
import NotLoggedInMessage from "../../components/not-logged-in-message/NotLoggedInMessage";
import Layout from "../../components/layout/Layout";
// import LoginButton from "../../components/login-button/LoginButton";
import MentorAvailabilityCalendar from "../../components/mentor-availability-calendar/MentorAvailabilityCalendar";
import ExampleMentorList from "../../components/example-mentor-list/ExampleMentorList.jsx";

export default function Schedule() {
  const { loading, user } = useAuthContext(); // Use useAuthContext hook to access user information
  const [selectedMentorUuid, setSelectedMentorUuid] = useState(null);

  // Function to handle mentor selection
  const handleMentorSelect = (mentorUuid) => {
    console.log(`Selected mentor UUID: ${mentorUuid}`);
    setSelectedMentorUuid(mentorUuid);
  };

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
    <Layout>
      <section id="schedule">
        <h1>Schedule a Meeting</h1>
        {user.role === "mentee" && !selectedMentorUuid && (
          <div>
            <p>Please select a mentor to view their availability:</p>
            {/* Add a mentor selection component here */}
            {/* For example: <MentorList onSelect={handleMentorSelect} /> */}
            <ExampleMentorList onSelect={handleMentorSelect} />
          </div>
        )}
        {user.role === "mentor" && (
          <p>Manage your availability calendar below:</p>
        )}
        {(selectedMentorUuid || user.role === "mentor") && (
          <MentorAvailabilityCalendar
            mentorUuid={selectedMentorUuid || user.id}
            userRole={user.role}
          />
        )}
        {/* <p>end of page</p> */}
      </section>
    </Layout>
  );
}
