import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import Loading from "../../components/loading/Loading";
import Layout from "../../components/layout/Layout";

const BookingDetails = () => {
  const { loading } = useAuthContext(); // Use useAuthContext hook to access user information

  const { id } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`/calendar/booking-details/${id}`);
        console.log("Booking details response:", response.data);
        setBookingDetails(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  } // or any other loading indicator

  if (!bookingDetails) {
    return (
      <Layout>
        <div>No booking details found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <h1>Booking Details</h1>
        <p>
          <strong>Mentor:</strong> {bookingDetails.userId?.userName || "N/A"}
        </p>
        <p>
          <strong>Start:</strong>{" "}
          {new Date(bookingDetails.start).toLocaleString()}
        </p>
        <p>
          <strong>End:</strong> {new Date(bookingDetails.end).toLocaleString()}
        </p>
      </div>
    </Layout>
  );
};

export default BookingDetails;
