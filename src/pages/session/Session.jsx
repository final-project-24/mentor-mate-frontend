import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import Loading from "../../components/loading/Loading";
import NotLoggedInMessage from "../../components/not-logged-in-message/NotLoggedInMessage";
import SessionDetails from "../../components/session-details/SessionDetails";
// import { fetchSessionData } from '../../utils/api-connector';
import { fetchUpcomingSessions } from "../../utils/api-connector";

const Session = () => {
  const { user, loading: authLoading } = useAuthContext();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Hey there! I'm the Session Page."); // Debug log

  useEffect(() => {
    const getSessionData = async () => {
      try {
        // const data = await fetchSessionData();
        const data = await fetchUpcomingSessions();
        setSessionData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      getSessionData();
    } else {
      setLoading(false); // Stop loading if user is not available
    }
  }, [user]);

  if (authLoading) {
    return <Loading />;
  }

  if (!user) {
    return <NotLoggedInMessage />;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // if (!sessionData.length) {
  //   return <p>No upcoming sessions available.</p>;
  // } // added
  if (!sessionData || sessionData.length === 0) {
    return <p>No upcoming sessions available.</p>;
  }

  return (
    <div>
      {/* <h1>Session Page</h1> */}
      {/* <SessionDetails data={sessionData} /> */}
      {sessionData.map((session) => (
        <SessionDetails key={session._id} data={session} />
      ))}
    </div>
  );
};

export default Session;
