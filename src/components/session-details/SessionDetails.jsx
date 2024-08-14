import React from 'react';
import './SessionDetails.css';

const SessionDetails = ({ data }) => {
  const placeholderLink = "https://www.example.com"; // Placeholder URL

  // Check if data exists and is valid
  if (!data) {
    return <p>No session data available.</p>;
  }

  return (
    <div className="session-details-container">
      <h2>Details of your upcoming session</h2>
      <p className="session-id">Session ID: {data.id}</p>
      <p className="session-name">Session Name: {data.name}</p>
      <p className="session-description">Description: {data.description}</p>
      <div className="meeting-link-container">
        <p>Meeting Link:</p>
        <a
          href={data.meetingLink || placeholderLink}
          className="meeting-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the Meeting
        </a>
      </div>
    </div>
  );
};

export default SessionDetails;


