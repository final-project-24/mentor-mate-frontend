import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SessionDetails.css';

// Function to generate a Jitsi Meet link
const generateJitsiLink = (roomName) => {
  return `https://meet.jit.si/${roomName}`;
};

// Function to fetch a meeting link from an API (Zoom or Google Meet integration can be added here)
const fetchMeetingLink = async (id) => {
  try {
    const response = await axios.get(`/api/meeting-link/${id}`);
    if (response.status === 200 && response.data.link) {
      return response.data.link;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching meeting link:', error);
    return null;
  }
};

const SessionDetails = ({ data }) => {
  const [meetingLink, setMeetingLink] = useState(null);
  const placeholderLink = "https://www.example.com"; // Placeholder URL

  useEffect(() => {
    const fetchMeetingData = async () => {
      if (data && data.id) {
        // Example of Jitsi Meet link generation
        const jitsiLink = generateJitsiLink(data.id);
        setMeetingLink(jitsiLink);

        // If you have an API to get the meeting link, you can uncomment and use it
        // const link = await fetchMeetingLink(data.id);
        // setMeetingLink(link || jitsiLink); // Fallback to Jitsi link if API fails
      } else {
        setMeetingLink(placeholderLink);
      }
    };

    fetchMeetingData();
  }, [data]);

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
          href={meetingLink || placeholderLink}
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
