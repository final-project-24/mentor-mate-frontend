import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../store/authentication-context/AuthenticationContext';
import SessionDetails from '../../components/session-details/SessionDetails';
import { fetchSessionData } from '../../utils/api-connector';

const Session = () => {
  const { user, loading: authLoading } = useAuthContext();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const data = await fetchSessionData();
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

  return (
    <div>
      {/* <h1>Session Page</h1> */}
      <SessionDetails data={sessionData} />
    </div>
  );
};

export default Session;



