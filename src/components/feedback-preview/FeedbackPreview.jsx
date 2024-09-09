import React, { useState } from "react";
import "./FeedbackPreview.css";
import ToggleButton from "../toggle-button/ToggleButton";

const FeedbackPreview = ({ feedback }) => {
  const [showFeedbackPreview, setShowFeedbackPreview] = useState(false);

  console.log("Hey there! I'm the Feedback Preview component."); // Debug
  // console.log("feedback:", feedback); // Debug

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
          {Object.entries(feedback).map(([key, value]) => {
            if (value) {
              return (
                <p key={key}>
                  <strong>{key}:</strong> {value.toString()}
                </p>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default FeedbackPreview;
