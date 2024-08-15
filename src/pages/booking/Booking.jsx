// // BookingDetails.jsx

// // import React from "react";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
// import Loading from "../../components/loading/Loading";
// import Layout from "../../components/layout/Layout";

// const Booking = () => {
//   const { loading } = useAuthContext(); // Use useAuthContext hook to access user information

//   const { id } = useParams();
//   const [bookingDetails, setBookingDetails] = useState(null);

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         const response = await axios.get(`/calendar/booking-details/${id}`);
//         console.log("Booking details response:", response.data);
//         setBookingDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching booking details:", error);
//       }
//     };

//     fetchBookingDetails();
//   }, [id]);

// //   if (!bookingDetails) {
// //     return (
// //       <Layout>
// //         <div>
// //           <>No booking details found.</>
// //         </div>
// //       </Layout>
// //     );
// //   }

//   if (loading) {
//     return <Loading />;
//   } // or any other loading indicator

//   return (
//     <Layout>
//       <div>
//         <h1>Booking Details</h1>
//         <p>Mentor: {bookingDetails.userId?.userName}</p>
//         <p>Start: {new Date(bookingDetails.start).toLocaleString()}</p>
//         <p>End: {new Date(bookingDetails.end).toLocaleString()}</p>
//       </div>
//     </Layout>
//   );
// };

// export default Booking;

import React from "react";
import BookingDetails from "../../components/booking-details/BookingDetails";

const Booking = () => {
  return <BookingDetails />;
};

export default Booking;