import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Loading from '../../components/loading/Loading';
import InfoCard from '../../components/info-card/InfoCard';
// import TermsAndConditions from '../../components/terms-and-conditions/TermsAndConditions';
import Payment from '../../components/payment/payment-details/Payment';

// const Booking = () => {
//   const { loading } = useAuthContext(); // Use the auth context
//   const { bookingId, setBookingId, isAgreed, setIsAgreed } =
//     useBookingContext(); // Use the booking context
//   const { id } = useParams();
//   const location = useLocation();
//   const [bookingDetails, setBookingDetails] = useState(null);

//   const handleAgreeChange = (agreed) => {
//     console.log('Agreement status changed:', agreed); // Debug log
//     setIsAgreed(agreed);
//   };

//   useEffect(() => {
//     if (location.state && location.state.id) {
//       // Use the id from the state if available
//       console.log('ID from state:', location.state.id);
//       setBookingId(location.state.id); // Set the booking ID in the context if available
//     } else if (id) {
//       setBookingId(id); // Set the booking ID in the context if the state is not available
//     }
//   }, [location.state, id, setBookingId]);

//   useEffect(() => {
//     console.log('Initial agreement status:', isAgreed);
//   }, []); // Debug log

//   useEffect(() => {
//     console.log('Agreement status updated:', isAgreed);
//   }, [isAgreed]); // Debug log

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         const response = await axios.get(`/booking/booking-details/${bookingId}`);
//         console.log('Booking details response:', response.data);
//         setBookingDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching booking details:', error);
//       } finally {
//         console.log('Booking details fetched successfully.');
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
//         />

//         {/* <TermsAndConditions onAgree={handleAgreeChange} /> */}

//         {isAgreed && <Payment />} {/* Conditionally render Payment */}
//       </div>
//     </Layout>
//   );
// };

// export default Booking;

const Booking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchBookingDetails(id);
        setBookingDetails(details);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  const handlePayment = async () => {
    try {
      // Step 1: Create a booking if needed
      const booking = await createBooking(bookingDetails.mentorId, bookingDetails.menteeId, bookingDetails.eventId, bookingDetails.start, bookingDetails.end);
      
      // Step 2: Create payment intent
      const { clientSecret } = await createPaymentIntent(amount, booking._id);
      setPaymentIntent(clientSecret);
      
      // Step 3: Handle Stripe payment confirmation
      // You would need to integrate Stripe's payment handling code here
      // After successful payment:
      await confirmPayment(paymentIntent.id, booking._id);
      
      // Navigate to session page or show success message
      navigate(`/session/${booking._id}`);
    } catch (error) {
      console.error('Error handling payment:', error);
    }
  };

  if (!bookingDetails) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="parent-container">
        <h1>Booking Details</h1>
        <InfoCard
          image={bookingDetails.mentorId.image}
          userName={bookingDetails.mentorId.userName}
          start={bookingDetails.start}
          end={bookingDetails.end}
        />
        {/* Optionally render the Payment component based on conditions */}
        {isAgreed && (
          <Payment
            amount={amount}
            offerDetails={bookingDetails} // Pass relevant details
            onPaymentSuccess={handlePayment} // Callback for payment success
          />
        )}
      </div>
    </Layout>
  );
};

export default Booking;
