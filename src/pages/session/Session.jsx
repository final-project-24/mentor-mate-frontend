import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../store/authentication-context/AuthenticationContext';
import SessionDetails from '../../components/session-details/SessionDetails';
// import { fetchSessionData } from '../../utils/api-connector';
import { fetchUpcomingSessions } from '../../utils/api-connector';

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
    return <p>Loading authentication...</p>;
  }

  if (!user) {
    return <p>Please log in to view this page.</p>;
  }

  if (loading) {
    return <p>Loading session data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!sessionData.length) {
    return <p>No upcoming sessions available.</p>;
  } // added

  return (
    <div className='mt-[100px] mb-[150px]'>
       <h1 className='text-accent text-center text-xl'>Upcoming Session</h1> 
      {/* <SessionDetails data={sessionData} /> */}
      {sessionData.map((session) => (
        <SessionDetails key={session._id} data={session} />
      ))}
    </div>
  );
};

export default Session;



