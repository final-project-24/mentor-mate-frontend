import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SessionDetails.css';

const generateJitsiLink = (roomName) => {
  return `https://meet.jit.si/${roomName}`;
};

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
  const placeholderLink = "https://www.example.com";

  const copyToClipboard = () => {
    if (meetingLink) {
      navigator.clipboard.writeText(meetingLink);
      alert('Meeting link copied to clipboard!');
    } else {
      alert('No meeting link available to copy.');
    }
  };

  useEffect(() => {
    const fetchMeetingData = async () => {
      if (data && data.id) {
        const jitsiLink = generateJitsiLink(data.id);
        setMeetingLink(jitsiLink);
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
        <a
          href={meetingLink || placeholderLink}
          className="meeting-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the Meeting
        </a>
        <button className="copy-button" onClick={copyToClipboard}>
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default SessionDetails;
