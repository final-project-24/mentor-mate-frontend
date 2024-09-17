import React, { useState, useEffect } from "react";
import "./SessionPreview.css";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import { useBookingContext } from "../../store/booking-context/BookingContext";
import Layout from "../../components/layout/Layout";
import SessionDetails from "../../components/session-details/SessionDetails";
import { fetchBookingDetails } from "../../utils/api-connector";
import { useNavigate } from "react-router-dom"; 

const SessionPreview = () => {
  const { user, loading: authLoading } = useAuthContext();
  const { bookingId, setBookingId } = useBookingContext();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  console.log("Hey there! I'm the Session Preview Page."); // Debug log

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const data = await fetchBookingDetails(bookingId);
        setSessionData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && bookingId) {
      getSessionData();
    } else {
      setLoading(false); // Stop loading if user is not available
    }

    // Cleanup function to reset bookingId when component unmounts
    return () => {
      setBookingId(null);
    };
  }, [user, bookingId, setBookingId]);

  const handleViewSessionsClick = () => {
    navigate("/dashboard/session#top"); // Redirect to the /session page
  };

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
    <Layout>
      <div id="session-preview">
        <SessionDetails data={sessionData} />
        {/* Add the button to redirect to the upcoming sessions */}
        <button className="view-sessions-btn" onClick={handleViewSessionsClick}>
          View Your Upcoming Sessions
        </button>
      </div>
    </Layout>
  );
};

export default SessionPreview;

