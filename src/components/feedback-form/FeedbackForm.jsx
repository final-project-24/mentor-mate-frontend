import React, { useState } from 'react';
import './FeedbackForm.css'; 

function FeedbackForm({ isMentor, onSubmit }) {
  const [comment, setComment] = useState('');
  const [strengths, setStrengths] = useState('');
  const [improvement, setImprovement] = useState('');
  const [publicFeedback, setPublicFeedback] = useState(false);
  const [rating, setRating] = useState(1);  // Default rating set to 1
  const [additionalComment, setAdditionalComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMentor || (comment && (rating || additionalComment))) {  // Ensure feedback is provided if required
      onSubmit({ comment, strengths, improvement, publicFeedback, rating, additionalComment });
    } else {
      alert("Please provide feedback.");
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={isMentor ? "Comments (required)" : "Comments (optional)"}
          required={isMentor} // Required for mentors, optional for mentees
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
              required // Required for mentors
            />
          </div>
          <div className="form-group">
            <label htmlFor="improvement">Areas of Improvement:</label>
            <textarea
              id="improvement"
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
              placeholder="Areas of Improvement"
              required // Required for mentors
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
  );
}

export default FeedbackForm;
