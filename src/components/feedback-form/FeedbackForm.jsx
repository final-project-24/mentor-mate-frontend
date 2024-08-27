
import React, { useState } from "react";
import "./FeedbackForm.css";

function FeedbackForm({ isMentor, onSubmit }) {
  const [comment, setComment] = useState("");
  const [strengths, setStrengths] = useState("");
  const [improvement, setImprovement] = useState("");
  const [publicFeedback, setPublicFeedback] = useState(false);
  const [rating, setRating] = useState(1); // Default rating set to 1
  const [additionalComment, setAdditionalComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false); // State to track if feedback is submitted

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isMentor || (comment && (rating || additionalComment))) {
      onSubmit({ comment, strengths, improvement, publicFeedback, rating, additionalComment });

      // Set feedback submitted state to true to show success message
      setFeedbackSubmitted(true);

      // Optionally, clear the form fields
      setComment('');
      setStrengths('');
      setImprovement('');
      setPublicFeedback(false);
      setRating(1);
      setAdditionalComment('');

      // Hide the message after 5 seconds
      setTimeout(() => setFeedbackSubmitted(false), 5000);
    } else {
      alert("Please provide feedback.");
    }
  };

  return (
    <>
      <div className="feedback-form-container">
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={isMentor ? "Comments (required)" : "Comments (optional)"}
              required={isMentor}
            />
          </div>
          {isMentor && (
            <>
              <div className="form-group">
                <label htmlFor="strengths">Strengths:</label>
                <textarea
                  id="strengths"
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                  placeholder="Strengths"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="improvement">Areas of Improvement:</label>
                <textarea
                  id="improvement"
                  value={improvement}
                  onChange={(e) => setImprovement(e.target.value)}
                  placeholder="Areas of Improvement"
                  required
                />
              </div>
            </>
          )}
          {!isMentor && (
            <>
              <div className="form-group">
                <label htmlFor="rating">Rating (1 to 5):</label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={publicFeedback}
                    onChange={(e) => setPublicFeedback(e.target.checked)}
                  />
                  Make feedback public
                </label>
              </div>
            </>
          )}
          <button type="submit">Submit Feedback</button>
        </form>
        {feedbackSubmitted && (
          <div className="success-message">
            Thank you for your feedback! It has been successfully submitted.
          </div>
        )}
      </div>
    </>
  );
}

export default FeedbackForm;
