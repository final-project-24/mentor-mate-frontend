import { useState, useEffect } from "react";
import { fetchPastSessions } from "../../utils/api-connector";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import Loading from "../../components/loading/Loading";
import SessionDetailsHistory from "../../components/session-details-history/SessionDetailsHistory";


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
        const data = await fetchPastSessions();
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
    return <p>Loading authentication...</p>;
  }

    // If the page is still loading, display a loading indicator
    if (loading) {
      return <Loading />;
    }

  if (!user) {
    return <p>Please log in to view this page.</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!sessionData.length) {
    return <p>No upcoming sessions available.</p>;
  } // added

  return (
    <div>
      {/* <h1>Session Page</h1> */}
      {sessionData.map((session) => (
        <SessionDetailsHistory key={session._id} data={session} />
      ))}
    </div>
  );
};

export default Session;
