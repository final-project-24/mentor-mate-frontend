import React, { useState, useEffect } from "react";
import "./SessionPreview.css";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import { useBookingContext } from "../../store/booking-context/BookingContext";
import Layout from "../../components/layout/Layout";
import SessionDetails from "../../components/session-details/SessionDetails";
import { fetchBookingDetails } from "../../utils/api-connector";

const Session = () => {
  const { user, loading: authLoading } = useAuthContext();
  const { bookingId, setBookingId } = useBookingContext();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div id="session-preview" className="mt-[80px] mb-[100px]">
        {/* <h1>Session Page</h1> */}
        <SessionDetails data={sessionData} />
      </div>
    </Layout>
  );
};

export default Session;
