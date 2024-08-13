import React, { useState } from "react";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import "./Schedule.css";
import Layout from "../../components/layout/Layout";
import MentorAvailabilityCalendar from "../../components/mentor-availability-calendar/MentorAvailabilityCalendar";
import ExampleMentorList from "../../components/example-mentor-list/ExampleMentorList.jsx";

export default function Schedule() {
  const { user } = useAuthContext(); // Use useAuthContext hook to access user information
  const [selectedMentorId, setSelectedMentorId] = useState(null);

  // Function to handle mentor selection
  const handleMentorSelect = (mentorId) => {
    console.log(`Selected mentor ID: ${mentorId}`);
    setSelectedMentorId(mentorId);
  };

  // =======================================
  // if (!user) {
  //   return <div>Loading...</div>; // or any other loading indicator
  // }
  // =======================================
  // if (!user) {
  //   return (
  //     <div className="loading-container">
  //       <ClipLoader size={50} color={"#123abc"} loading={true} />
  //     </div>
  //   ); // or any other loading indicator
  // }
  // =======================================
  if (!user) {
    return (
      <Layout>
        <div className="not-logged-in-container">
          <p>You are not logged in. Please log in to schedule a meeting.</p>
          <ul>
            <li>
              <Link to="/authentication">Login</Link>
            </li>
          </ul>
        </div>
      </Layout>
    ); // or any other loading indicator
  }
  // =======================================

  return (
    <Layout>
      <section id="schedule">
        <h1>Schedule a Meeting</h1>
        {user.role === "mentee" && !selectedMentorId && (
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
        {(selectedMentorId || user.role === "mentor") && (
          <MentorAvailabilityCalendar
            mentorId={selectedMentorId || user.id}
            userRole={user.role}
          />
        )}
        {/* <p>end of page</p> */}
      </section>
    </Layout>
  );
}
