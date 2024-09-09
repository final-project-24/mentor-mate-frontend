import React, { useState } from "react";
import "./FeedbackPreview.css";
import ToggleButton from "../toggle-button/ToggleButton";

const FeedbackPreview = ({ feedback }) => {
  const [showFeedbackPreview, setShowFeedbackPreview] = useState(false);

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
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackPreview;
