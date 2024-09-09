import React, { useState, useEffect } from "react";
// import axios from 'axios';
import "./SessionDetails.css";

// const generateJitsiLink = (roomName) => {
//   return `https://meet.jit.si/${roomName}`;
// };

// const generateGoogleMeetLink = (roomName) => {
//   // A placeholder function to generate a Google Meet link.
//   // In practice, Google Meet links would be generated through the Google Calendar API.
//   return `https://meet.google.com/${roomName}`;
// };

// const fetchMeetingLink = async (id) => {
//   try {
//     const response = await axios.get(`/api/meeting-link/${id}`);
//     if (response.status === 200 && response.data.link) {
//       return response.data.link;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching meeting link:', error);
//     return null;
//   }
// };

const SessionDetails = ({ data }) => {
  // const [jitsiLink, setJitsiLink] = useState(null);
  // const [googleMeetLink, setGoogleMeetLink] = useState(null);
  const [copyMessage, setCopyMessage] = useState("");
  // const placeholderLink = "https://www.example.com";

  // console.log("data:", data); // Debug log

  const handleLinkClick = (link) => {
    if (link) {
      navigator.clipboard.writeText(link);
      setCopyMessage("Link copied to clipboard!");
      setTimeout(() => setCopyMessage(""), 3000); // Clear message after 3 seconds
    } else {
      setCopyMessage("No link available to copy.");
    }
  };

  // useEffect(() => {
  //   const fetchMeetingData = async () => {
  //     if (data && data._id) {
  //       const jitsiLink = generateJitsiLink(data._id);
  //       const googleMeetLink = generateGoogleMeetLink(data._id); // added _ to id jvdfj

  //       setJitsiLink(jitsiLink);
  //       setGoogleMeetLink(googleMeetLink);
  //     } else {
  //       setJitsiLink(placeholderLink);
  //       setGoogleMeetLink(placeholderLink);
  //     }
  //   };

  //   fetchMeetingData();
  // }, [data]);

  if (!data) {
    return <p>No session data available.</p>;
  }

  const formattedStartDate = new Date(data.start).toLocaleDateString();
  const formattedStartTime = new Date(data.start).toLocaleTimeString();
  const formattedEndTime = new Date(data.end).toLocaleTimeString();

  return (
    <div className="session-details-container">
      <h1>🥳 WELCOME! These are the details of your upcoming session!</h1>{" "}
      <br />
      <p className="session-id">Session ID: {data._id}</p>
      <p className="session-name">
        Session Name: {data.selectedSkill[0].protoSkillTitle}
      </p>
      <p className="session-description">Description: {data.title}</p>
      <p className="session-date">Date: {formattedStartDate}</p>
      <p className="session-time">
        Time: {formattedStartTime} - {formattedEndTime}
      </p>
      <div className="meeting-link-container">
        <div className="meeting-option">
          <a
            href={data.jitsiLink} // added
            // href={jitsiLink || placeholderLink}
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
              // handleLinkClick(jitsiLink);
              handleLinkClick(data.jitsiLink); // added
            }}
          >
            Copy Jitsi Link
          </a>
        </div>

        <div className="meeting-option">
          <a
            href={data.googleMeetLink} // added
            // href={googleMeetLink || placeholderLink}
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
              // handleLinkClick(googleMeetLink);
              handleLinkClick(data.googleMeetLink); // added
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
          <li>
            Google Meet: Download the Google Meet app from your app store.
          </li>
        </ul>
        <div>
          <p>
            You can also join via phone. For Jitsi, use the following dial-in
            numbers:
          </p>
          <ul>
            <li>
              <a href="tel:+11234567890">+1-123-456-7890</a>{" "}
              {/* Replace with actual Jitsi dial-in numbers */}
            </li>
          </ul>
          For Google Meet, dial:
          <ul>
            <li>
              <a href="tel:+12345678901">+1-234-567-8901</a>{" "}
              {/* Replace with actual Google Meet dial-in numbers */}
            </li>
          </ul>
          <p>
            Ensure you have a stable internet connection and permissions enabled
            for camera and microphone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
