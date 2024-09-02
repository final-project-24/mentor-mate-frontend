import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SessionDetails.css';

const generateJitsiLink = (roomName) => {
  return `https://meet.jit.si/${roomName}`;
};

const generateGoogleMeetLink = (roomName) => {
  // A placeholder function to generate a Google Meet link.
  // In practice, Google Meet links would be generated through the Google Calendar API.
  return `https://meet.google.com/${roomName}`;
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
  const [jitsiLink, setJitsiLink] = useState(null);
  const [googleMeetLink, setGoogleMeetLink] = useState(null);
  const [copyMessage, setCopyMessage] = useState('');
  const placeholderLink = "https://www.example.com";

  const handleLinkClick = (link) => {
    if (link) {
      navigator.clipboard.writeText(link);
      setCopyMessage('Link copied to clipboard!');
      setTimeout(() => setCopyMessage(''), 3000); // Clear message after 3 seconds
    } else {
      setCopyMessage('No link available to copy.');
    }
  };

  useEffect(() => {
    const fetchMeetingData = async () => {
      if (data && data.id) {
        const jitsiLink = generateJitsiLink(data.id);
        const googleMeetLink = generateGoogleMeetLink(data.id);

        setJitsiLink(jitsiLink);
        setGoogleMeetLink(googleMeetLink);
      } else {
        setJitsiLink(placeholderLink);
        setGoogleMeetLink(placeholderLink);
      }
    };

    fetchMeetingData();
  }, [data]);

  if (!data) {
    return <p>No session data available.</p>;
  }

  return (
    <div className="session-details-container">
      <h1>🥳 WELCOME! These are the details of your upcoming session!</h1> <br />
      <p className="session-id">Session ID: {data.id}</p>
      <p className="session-name">Session Name: {data.name}</p>
      <p className="session-description">Description: {data.description}</p>

      <div className="meeting-link-container">
        <div className="meeting-option">
          <a
            href={jitsiLink || placeholderLink}
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
              handleLinkClick(jitsiLink);
            }}
          >
            Copy Jitsi Link
          </a>
        </div>

        <div className="meeting-option">
          <a
            href={googleMeetLink || placeholderLink}
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
              handleLinkClick(googleMeetLink);
            }}
          >
            Copy Google Meet Link
          </a>
        </div>
      </div>

      {copyMessage && <p className="copy-message">{copyMessage}</p>}

      <div className="disclaimer">
        <p>
          For the best experience, use a desktop or laptop computer. If you are joining from a mobile device, 
          please ensure you have the appropriate app installed:
        </p>
        <ul>
          <li>Jitsi: Download the Jitsi Meet app from your app store.</li>
          <li>Google Meet: Download the Google Meet app from your app store.</li>
        </ul>
        <p>
          You can also join via phone. For Jitsi, use the following dial-in numbers:
          <ul>
            <li>
              <a href="tel:+11234567890">+1-123-456-7890</a> {/* Replace with actual Jitsi dial-in numbers */}
            </li>
          </ul>
          For Google Meet, dial:
          <ul>
            <li>
              <a href="tel:+12345678901">+1-234-567-8901</a> {/* Replace with actual Google Meet dial-in numbers */}
            </li>
          </ul>
          Ensure you have a stable internet connection and permissions enabled for camera and microphone.
        </p>
      </div>
    </div>
  );
};

export default SessionDetails;
