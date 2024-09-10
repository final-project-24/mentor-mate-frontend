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
    <div>
      {sessionData.map((session) => (
        <SessionDetails key={session._id} data={session} />
      ))}
    </div>
  );
};

export default Session;



// import React, { useState, useEffect } from 'react';
// import { useAuthContext } from '../../store/authentication-context/AuthenticationContext';
// import SessionDetails from '../../components/session-details/SessionDetails';
// import { fetchUpcomingSessions } from '../../utils/api-connector';
// import { useNavigate } from 'react-router-dom'; 
// import Loading from "../../components/loading/Loading";
// import './Session.css';

// const Session = () => {
//   const { user, loading: authLoading } = useAuthContext();
//   const [sessionData, setSessionData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate(); // Initialize useNavigate

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
//     return <Loading />;
//   }

//   if (!user) {
//     return <NotLoggedInMessage />;
//   }

//   if (loading) {
//     return <Loading />;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   // if (!sessionData.length) {
//   //   return <p>No upcoming sessions available.</p>;
//   // } // added
//   if (!sessionData || sessionData.length === 0) {
//     return <p>No upcoming sessions available.</p>;
//   }

//   return (
//     <div className='mt-[100px] mb-[150px]'>
//        <h1 className='text-accent text-center text-xl'>Upcoming Session</h1> 
//       {/* <SessionDetails data={sessionData} /> */}
//       {sessionData.map((session) => (
//         <SessionDetails
//           key={session._id}
//           data={session}
//         />
//       ))}
//     </div>
//   );
// };

// export default Session;
