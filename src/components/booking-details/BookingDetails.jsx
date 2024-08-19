import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import "./BookingDetails.css";
import Loading from "../../components/loading/Loading";
import Layout from "../../components/layout/Layout";
import InfoCard from "../info-card/InfoCard";

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
    <div className="flex-container">
      <h1>Booking Details</h1>

      <InfoCard
        // id={bookingDetails.userId._id}
        image={bookingDetails.userId.image}
        userName={bookingDetails.userId.userName}
        // email={bookingDetails.userId.email}
        // role={bookingDetails.userId.role}
        // skills={bookingDetails.userId.skills}
        start={bookingDetails.start}
        end={bookingDetails.end}
      />
    </div>
  );
};

export default BookingDetails;
