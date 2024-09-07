// import { useState, useEffect } from "react";
// import Layout from "../../components/layout/Layout";
// import axios from "axios";
// import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
// import { useBookingContext } from "../../store/booking-context/BookingContext";
// import "./Booking.css";
// import Loading from "../../components/loading/Loading";
// import InfoCard from "../../components/info-card/InfoCard";
// import Payment from "../../components/payment-details/payment/Payment";
// // import BookingDetails from "../../components/booking-details/BookingDetails";
// // import Terms from "../pages/terms/Terms";
// // import Payment from "../../components/payment/Payment";
// import { useParams, useLocation } from "react-router-dom";

// const Booking = () => {
//   const { loading } = useAuthContext(); // Use the auth context
//   const { bookingId, setBookingId, isAgreed, setIsAgreed } =
//     useBookingContext(); // Use the booking context
//   const { id } = useParams();
//   const location = useLocation();
//   const [bookingDetails, setBookingDetails] = useState(null);

//   const handleAgreeChange = (agreed) => {
//     console.log("Agreement status changed:", agreed); // debug log
//     setIsAgreed(agreed);
//   };

//   useEffect(() => {
//     if (location.state && location.state.id) {
//       // Use the id from the state if available
//       console.log("ID from state:", location.state.id);
//       setBookingId(location.state.id); // Set the booking ID in the context if available
//     } else if (id) {
//       setBookingId(id); // Set the booking ID in the context if the state is not available
//     }
//   }, [location.state, id, setBookingId]);

//   useEffect(() => {
//     console.log("Initial agreement status:", isAgreed);
//   }, []); // debug log

//   useEffect(() => {
//     console.log("Agreement status updated:", isAgreed);
//   }, [isAgreed]); // debug log

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         const response = await axios.get(
//           `/calendar/booking-details/${bookingId}`
//         );
//         console.log("Booking details response:", response.data);
//         setBookingDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching booking details:", error);
//       } finally {
//         console.log("Booking details fetched successfully.");
//       }
//     };

//     if (bookingId) {
//       fetchBookingDetails();
//     }
//   }, [bookingId]);

//   if (loading) {
//     return <Loading />;
//   }

//   if (!bookingDetails) {
//     return (
//       <Layout>
//         <div>No booking details found.</div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="parent-container">
//         <h1>Booking Details</h1>

//         <InfoCard
//           image={bookingDetails.mentorId.image} // Use mentorId instead of userId
//           userName={bookingDetails.mentorId.userName} // Use mentorId instead of userId
//           start={bookingDetails.start}
//           end={bookingDetails.end}
//           price={bookingDetails.price}
//         />

//         <Payment
//           bookingId={bookingId} // Pass bookingId to the Payment component
//           menteeData={bookingDetails.menteeData}
//           amount={bookingDetails.price}
//           offerDetails={bookingDetails}
//         />

//         {/* <TermsAndConditions onAgree={handleAgreeChange} /> */}

//         {/* {isAgreed && <Payment />} */}
//       </div>
//     </Layout>
//   );
// };

// export default Booking;

import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { fetchBookingDetails } from "../../utils/api-connector";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import { useBookingContext } from "../../store/booking-context/BookingContext";
import "./Booking.css";
import Loading from "../../components/loading/Loading";
import Payment from "../../components/payment-details/payment/Payment";
import { useParams, useLocation } from "react-router-dom";

const Booking = () => {
  const { loading } = useAuthContext();
  const { bookingId, setBookingId, isAgreed, setIsAgreed } = useBookingContext();
  const { id } = useParams();
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState(null);

  // Handle agreement status change
  const handleAgreeChange = (agreed) => {
    setIsAgreed(agreed);
  };

  // Set booking ID from URL parameters or location state
  useEffect(() => {
    if (location.state && location.state.id) {
      setBookingId(location.state.id);
    } else if (id) {
      setBookingId(id);
    }
  }, [location.state, id, setBookingId]);

  // Fetch booking details based on bookingId
  useEffect(() => {
    const getBookingDetails = async () => {
      try {
        const data = await fetchBookingDetails(bookingId);
        setBookingDetails(data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    if (bookingId) {
      getBookingDetails();
    }
  }, [bookingId]);

  if (loading) {
    return <Loading />;
  }

  if (!bookingDetails) {
    return (
      <Layout>
        <div>No booking details found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="booking-container">
        <Payment
          bookingId={bookingId} // Pass bookingId to the Payment component
          // menteeData={bookingDetails.menteeData}
          amount={bookingDetails.price}
          offerDetails={bookingDetails}
        />

        {/* Additional components or content can go here */}
      </div>
    </Layout>
  );
};

export default Booking;
