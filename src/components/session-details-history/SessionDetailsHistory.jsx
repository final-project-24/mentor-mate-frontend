import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SessionDetailsHistory.css";
import ToggleButton from "../toggle-button/ToggleButton";
import FeedbackPreview from "../feedback-preview/FeedbackPreview";

const SessionDetailsHistory = ({ data }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  console.log("data:", data); // Debug log

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

  return (
  
    <div className="session-details-container mt-[90px] m-2  min-h-[0px]">
      <h1 className="text-accent">
        🥳 WELCOME!
        <p>These are the details of your finished session!</p>
      </h1>
      <br />
      <p className="session-id">Session ID: {data._id}</p>
      <p className="session-name">
        Session Name: {data.selectedSkill[0].protoSkillTitle}
      </p>
      <p className="session-description pb-2">Description: {data.title}</p>
      <ToggleButton
        onToggle={onToggleSubmitFeedback}
        buttonName="Submit Feedback"
        className="button-type-standard"
      />
      <FeedbackPreview feedback={data.feedback} />
    </div>
  );
};

export default SessionDetailsHistory;
