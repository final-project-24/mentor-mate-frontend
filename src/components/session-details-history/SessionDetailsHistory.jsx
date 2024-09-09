import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SessionDetailsHistory.css";
import { fetchFeedbacks } from "../../utils/api-connector";
import ToggleButton from "../toggle-button/ToggleButton";
import FeedbackPreview from "../feedback-preview/FeedbackPreview";

const SessionDetailsHistory = ({ data }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [feedback, setFeedback] = useState(null); // State to store feedback

  console.log("Hey there! I'm the Session Details History component.");
  // console.log("data:", data); // Debug log

  useEffect(() => {
    if (data) {
      fetchFeedbacks(data._id, data.mentorUuid, data.menteeUuid)
        .then((fetchedFeedback) => {
          setFeedback(fetchedFeedback);
          // console.log("fetchedFeedback:", fetchedFeedback); // Log the fetched feedback
        })
        .catch((error) => {
          console.error("Error fetching feedback:", error);
        });
    }
  }, [data]);

  const onToggleSubmitFeedback = () => {
    navigate("/feedback", {
      state: {
        bookingId: data._id,
        mentorUuid: data.mentorUuid,
        menteeUuid: data.menteeUuid,
      },
    }); // Pass the session ID
  };

  if (!data) {
    return <p>No session data available.</p>;
  }

  const formattedStartDate = new Date(data.start).toLocaleDateString();
  const formattedStartTime = new Date(data.start).toLocaleTimeString();
  const formattedEndTime = new Date(data.end).toLocaleTimeString();

  return (
    <div className="session-details-container">
      <h1>🥳 WELCOME! These are the details of your finished session!</h1>{" "}
      <br />
      <p className="session-id">Session ID: {data._id}</p>
      <p className="session-name">
        Session Name: {data.selectedSkill[0].protoSkillTitle}
      </p>
      <p className="session-description">Description: {data.title}</p>
      <p className="session-date">Date: {formattedStartDate}</p>
      <p className="session-time">
        Time: {formattedStartTime} - {formattedEndTime}
      </p>
      <ToggleButton
        onToggle={onToggleSubmitFeedback}
        buttonName="Submit Feedback"
        className="button-type-standard"
      />
      <FeedbackPreview feedback={feedback} />
    </div>
  );
};

export default SessionDetailsHistory;
