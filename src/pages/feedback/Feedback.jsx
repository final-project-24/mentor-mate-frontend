import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import FeedbackForm from "../../components/feedback-form/FeedbackForm";
import { submitFeedback } from "../../utils/api-connector";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";

function Feedback() {
  const { user } = useAuthContext(); // Get the user object from the context
  const isMentor = user?.role === "mentor"; // Determine if the user is a mentor based on the role
  const location = useLocation(); // Get the location object
  const bookingId = location.state?.bookingId; // Extract the session ID from the state
  const mentorUuid = location.state?.mentorUuid; // Extract the mentor UUID from the state
  const menteeUuid = location.state?.menteeUuid; // Extract the mentee UUID from the state
  

  //isMentor is a prop used to determine whether the user is a mentor or a mentee.
  const handleFeedbackSubmit = (feedbackData) => {
    submitFeedback({ ...feedbackData, isMentor, bookingId, mentorUuid, menteeUuid }) // Include the session ID
      .then((data) => {
        // Handle successful submission, maybe navigate or show a success message
        console.log("Feedback successfully submitted:", data);
        alert("Feedback submitted successfully!");
      })
      .catch((error) => {
        // Handle submission error, show an error message
        console.error("Error submitting feedback:", error);
        alert("Error submitting feedback.");
      });
  };

  return (
    <Layout>
      <div>
        <h2>{isMentor ? "Mentor Feedback" : "Mentee Feedback"}</h2>
        <FeedbackForm isMentor={isMentor} onSubmit={handleFeedbackSubmit} />
      </div>
    </Layout>
  );
}
//isMentor: Determines whether the form should be required or not based on the role (mentor or mentee).onSubmit={handleFeedbackSubmit}: Provides the handleFeedbackSubmit function to be called when the form is submitted.
//

export default Feedback;
