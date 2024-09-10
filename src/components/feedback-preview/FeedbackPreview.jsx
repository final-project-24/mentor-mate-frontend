import React, { useState } from "react";
import "./FeedbackPreview.css";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import ToggleButton from "../toggle-button/ToggleButton";

const FeedbackPreview = ({ feedback }) => {
  const { user } = useAuthContext();
  const [showFeedbackPreview, setShowFeedbackPreview] = useState(false);

  console.log("Hey there! I'm the Feedback Preview component."); // Debug
  // console.log("feedback:", feedback); // Debug

  if (!feedback) {
    return <p className="error-message">Your feedback is not ready yet.</p>;
  }

  return (
    <div id="feedback-preview-container">
      <ToggleButton
        onToggle={() => setShowFeedbackPreview(!showFeedbackPreview)}
        buttonName={showFeedbackPreview ? "Hide Feedback" : "Show Feedback"}
        className="button-type-standard"
      />
      {showFeedbackPreview && (
        <div className="feedback-preview-content">
          <h2>Feedback Details</h2>
          {/* {feedback.bookingId && (
            <p>
              <strong>Session ID:</strong> {feedback.bookingId.toString()}
            </p>
          )} */}
          {user.role === "mentor" && feedback.publicFeedback !== undefined && (
            <p>
              <strong>Public Feedback:</strong>{" "}
              {feedback.publicFeedback ? "Yes" : "No"}
            </p>
          )}
          {user.role === "mentor" && feedback.rating !== undefined && (
            <p>
              <strong>Rating:</strong> {feedback.rating}
            </p>
          )}
          {user.role === "mentee" && feedback.strengths && (
            <p>
              <strong>Strengths:</strong> {feedback.strengths}
            </p>
          )}
          {user.role === "mentee" && feedback.improvement && (
            <p>
              <strong>Improvement:</strong> {feedback.improvement}
            </p>
          )}
          {feedback.comment && (
            <p>
              <strong>Comment:</strong> {feedback.comment}
            </p>
          )}
          {feedback.additionalComment && (
            <p>
              <strong>Additional Comment:</strong> {feedback.additionalComment}
            </p>
          )}
          {/* {feedback.isMentor !== undefined && (
            <p>
              <strong>Is Mentor:</strong> {feedback.isMentor ? "Yes" : "No"}
            </p>
          )} */}
          {/* {feedback.mentorUuid && (
            <p>
              <strong>Mentor UUID:</strong> {feedback.mentorUuid}
            </p>
          )} */}
        </div>
      )}
    </div>
  );
};

export default FeedbackPreview;
