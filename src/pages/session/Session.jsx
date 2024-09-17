// import React, { useState, useEffect } from 'react';
// import { useAuthContext } from '../../store/authentication-context/AuthenticationContext';
// import SessionDetails from '../../components/session-details/SessionDetails';
// import { fetchUpcomingSessions } from '../../utils/api-connector';
// import './Session.css';

// const Session = () => {
//   const { user, loading: authLoading } = useAuthContext();
//   const [sessionData, setSessionData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   console.log("Hey there! I'm the Session Page."); // Debug log

//   useEffect(() => {
//     const getSessionData = async () => {
//       try {
//         const data = await fetchUpcomingSessions();
//         setSessionData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) {
//       getSessionData();
//     } else {
//       setLoading(false); // Stop loading if user is not available
//     }
//   }, [user]);

//   if (authLoading) {
//     return <p>Loading authentication...</p>;
//   }

//   if (!user) {
//     return <p>Please log in to view this page.</p>;
//   }

//   if (loading) {
//     return <p>Loading session data...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (!sessionData.length) {
//     return <p>No upcoming sessions available.</p>;
//   }

//   const freeSessionTokens = user?.freeSessionTokens || 0; // Static rendering for demo purposes

//   return (
//     <div>
//       <div className="free-tokens">
//         <h3>Your free Session Tokens:</h3>
//         <h4>{freeSessionTokens}</h4>
//         <br />
//         <h6>Here you can find the credits you have collected and that you can use to rebook a session for free!</h6>
//       </div>
//       {sessionData.map((session) => (
//         <SessionDetails key={session._id} data={session} />
//       ))}
//     </div>
//   );
// };

// export default Session;


import React, { useState, useEffect } from "react";
import Loading from "../../components/loading/Loading";
import NotLoggedInMessage from "../../components/not-logged-in-message/NotLoggedInMessage";
import SessionDetails from "../../components/session-details/SessionDetails";
import { useAuthContext } from '../../store/authentication-context/AuthenticationContext';
import { fetchUpcomingSessions } from '../../utils/api-connector';
import './Session.css';

const Session = () => {
  const { user, loading: authLoading } = useAuthContext();
  const [sessionData, setSessionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSessionData = async () => {
      try {
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
    return <Loading message="Loading authentication..." />;
  }

  if (!user) {
    return <NotLoggedInMessage message="Please log in to view this page." />;
  }

  if (loading) {
    return <Loading message="Loading session data..." />;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (!sessionData.length) {
    return <p>No upcoming sessions available.</p>;
  }

  const freeSessionTokens = user?.freeSessionTokens || 0;

  return (
    <div className="pt-[90px]">
      <h2 className="text-center text-accent text-lg pb-5 pt-3" >Upcoming Sessions</h2>
      {sessionData.map((session) => (
        <SessionDetails key={session._id} data={session} />
      ))}
    </div>
  );
};

export default Session;
