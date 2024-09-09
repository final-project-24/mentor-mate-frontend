import React, { useState } from "react";
import "./SessionDetails.css";
import axios from 'axios';

const SessionDetails = ({ data }) => {
  const [copyMessage, setCopyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cancelMessage, setCancelMessage] = useState("");

  const handleLinkClick = (link) => {
    if (link) {
      navigator.clipboard.writeText(link);
      setCopyMessage("Link copied to clipboard!");
      setTimeout(() => setCopyMessage(""), 3000); // Clear message after 3 seconds
    } else {
      setCopyMessage("No link available to copy.");
    }
  };

  const handleCancelSession = async () => {
    setLoading(true);
    try {
      if (data && data._id) {
        const response = await axios.delete(`/session/cancel-session/${data._id}`);
        console.log("Response:", response.data);
        setCancelMessage("Your session has been canceled successfully!");
      } else {
        setCancelMessage("No session ID available.");
      }
    } catch (error) {
      console.error("Error canceling session:", error);
      setCancelMessage(error.response?.data?.message || "Failed to cancel the session.");
    } finally {
      setLoading(false);
    }
  };
  
  if (!data) {
    return <p>No session data available.</p>;
  }

  return (
    <div className="session-details-container">
      <h1>🥳 WELCOME! These are the details of your upcoming session!</h1>
      <br />
      <p className="session-id">Session ID: {data._id}</p>
      <p className="session-name">Session Name: {data.selectedSkill[0].protoSkillTitle}</p>
      <p className="session-description">Description: {data.title}</p>
      <div className="meeting-link-container">
        <div className="meeting-option">
          <a
            href={data.jitsiLink}
            className="meeting-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join via Jitsi
          </a>
          <a
            href="#"
            className="copy-link"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(data.jitsiLink);
            }}
          >
            Copy Jitsi Link
          </a>
        </div>

        <div className="meeting-option">
          <a
            href={data.googleMeetLink}
            className="meeting-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join via Google Meet
          </a>
          <a
            href="#"
            className="copy-link"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(data.googleMeetLink);
            }}
          >
            Copy Google Meet Link
          </a>
        </div>
      </div>

      {copyMessage && <p className="copy-message">{copyMessage}</p>}

      <div className="disclaimer">
        <p>
          For the best experience, use a desktop or laptop computer. If you are
          joining from a mobile device, please ensure you have the appropriate
          app installed:
        </p>
        <ul>
          <li>Jitsi: Download the Jitsi Meet app from your app store.</li>
          <li>Google Meet: Download the Google Meet app from your app store.</li>
        </ul>
        <p>
          You can also join via phone. For Jitsi, use the following dial-in numbers:
        </p>
        <ul>
          <li><a href="tel:+11234567890">+1-123-456-7890</a></li>
        </ul>
        <p>For Google Meet, dial:</p>
        <ul>
          <li><a href="tel:+12345678901">+1-234-567-8901</a></li>
        </ul>
        <p>Ensure you have a stable internet connection and permissions enabled for camera and microphone.</p>
      </div>

      {cancelMessage && <p className="cancel-message">{cancelMessage}</p>}
      
      <button
        className="cancel-button"
        onClick={handleCancelSession}
        disabled={loading}
      >
        {loading ? 'Cancelling...' : 'Cancel Session'}
      </button>
      
      <p className="cancellation-policy">
        <strong>Cancellation Policy:</strong> You can cancel your session up to 24 hours in advance. No refund will be processed, but you will be eligible to book another session using a credit.
      </p>
    </div>
  );
};

export default SessionDetails;
