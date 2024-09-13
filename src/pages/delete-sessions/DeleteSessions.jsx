import React, { useEffect, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  fetchAvailableUpcomingEventsForMentor,
  deleteAvailability,
} from "../../utils/api-connector";
import "./DeleteSessions.css";

const DeleteSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSessions = async () => {
      try {
        const data = await fetchAvailableUpcomingEventsForMentor();
        setSessions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getSessions();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await deleteAvailability(eventId);
      setSessions(sessions.filter((session) => session._id !== eventId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="delete-sessions-container">
      <h1>Delete Sessions</h1>
      {sessions.length === 0 ? (
        <p>No upcoming sessions found.</p>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session._id} className="session-item">
              <div>
                <p>
                  <strong>Mentor:</strong> {session.mentorId.userName}
                </p>
                {/* <p>
                  <strong>Mentee:</strong>{" "}
                  {session.menteeId ? session.menteeId.userName : "N/A"}
                </p> */}
                <p>
                  <strong>Start:</strong>{" "}
                  {moment(session.start).format("MMMM Do YYYY, h:mm a")}
                </p>
                <p>
                  <strong>End:</strong>{" "}
                  {moment(session.end).format("MMMM Do YYYY, h:mm a")}
                </p>
              </div>
              <button
                className="delete-button bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(session._id)}
              >Delete {" "}
                <FontAwesomeIcon icon={faTrashAlt} /> {/* Use trash icon */}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteSessions;
