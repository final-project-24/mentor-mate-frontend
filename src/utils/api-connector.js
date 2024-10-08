// This file contains all the api calls related to user authentication
// We can add more api calls related to user authentication in this file
// The API calls are imported in the AuthenticationContext.tsx file

import axios from "axios";
import moment from "moment";

// user authentication API calls =======================================

// login user
export const loginUser = async (email, password) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

// signup user
export const signupUser = async (
  userName,
  email,
  password,
  confirmPassword,
  role,
  image
) => {
  const res = await axios.post("/user/signup", {
    userName,
    email,
    password,
    confirmPassword,
    role,
    image,
  });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

// check user authentication
export const checkUserAuth = async () => {
  const res = await axios.get("/user/auth");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

// logout user
export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout");
  }
  const data = await res.data;
  return data;
};

// user API calls ======================================================

// forgot password
export const forgotPassword = async (email) => {
  try {
    const res = await axios.post("/user/forgot-password", { email });
    if (res.status !== 200) {
      throw new Error("Unable to send password reset email");
    }
    return res.data;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

// reset password
export const resetPassword = async (token, password) => {
  try {
    const res = await axios.post(`/user/reset-password/${token}`, { password });
    if (res.status !== 200) {
      throw new Error("Unable to reset password");
    }
    return res.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// delete user
export const deleteUser = async () => {
  try {
    const res = await axios.delete("/user");
    if (res.status !== 200) {
      throw new Error("Unable to delete user");
    }
    return res.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// get all users
export const fetchUsers = async () => {
  try {
    const res = await axios.get("/user/get-users");
    if (res.status !== 200) {
      throw new Error("Unable to fetch users");
    }
    const data = await res.data;
    console.log("Fetched users:", data.users); // Log fetched users
    return data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// (admin only) ChangeRole.jsx
export const updateUserRole = async (newRole) => {
  try {
    const res = await axios.put(`/user/update-role`, {
      newRole,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

// change username
export const changeUserName = async (newUserName) => {
  try {
    const res = await axios.post("/user/change-username", { newUserName });
    if (res.status !== 200) {
      throw new Error("Unable to change username");
    }
    return res.data;
  } catch (error) {
    console.error("Error changing username:", error);
    throw error;
  }
};

// change password
export const changePassword = async (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  try {
    const res = await axios.put("/user/change-password", {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    if (res.status !== 200) {
      throw new Error("Unable to change password");
    }
    return res.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

// change email
export const changeEmail = async (newEmail) => {
  try {
    const res = await axios.put("/user/change-email", { newEmail });
    if (res.status !== 200) {
      throw new Error("Unable to change email");
    }
    return res.data;
  } catch (error) {
    console.error("Error changing email:", error);
    throw error;
  }
};

// change user image
export const changeUserImage = async (newImage) => {
  try {
    const res = await axios.put("/user/change-image", { newImage });
    if (res.status !== 200) {
      throw new Error("Unable to change user image");
    }
    return res.data;
  } catch (error) {
    console.error("Error changing user image:", error);
    throw error;
  }
};

// feedback API calls ==================================================

// submit feedback
export const submitFeedback = async (
  feedbackData,
  bookingId,
  mentorUuid,
  menteeUuid
) => {
  try {
    const res = await axios.post(
      "/feedback",
      feedbackData,
      bookingId,
      mentorUuid,
      menteeUuid
    );
    console.log("Feedback submitted:", res.data); // Log submitted feedback
    if (res.status !== 201) {
      throw new Error("Unable to submit feedback");
    }
    return res.data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};

// fetch feedbacks
export const fetchFeedbacks = async (bookingId, mentorUuid, menteeUuid) => {
  try {
    const res = await axios.get("/feedback", {
      params: { bookingId, mentorUuid, menteeUuid },
    });
    console.log("Fetched feedbacks:", res.data); // Log fetched feedbacks
    if (res.status !== 200) {
      throw new Error("Unable to fetch feedbacks");
    }
    console.log("Fetched feedbacks:", res.data); // Log fetched feedbacks
    return res.data;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    throw error;
  }
};

// fetch public feedbacks with mentor details and skills
export const fetchPublicFeedbacks = async () => {
  try {
    // console.log("🔎 Fetching public feedbacks with mentor details and skills...");
    const res = await axios.get("/feedback/public");
    console.log("Fetched public feedbacks:", res.data); // Log fetched public feedbacks
    if (res.status !== 200) {
      throw new Error("Unable to fetch public feedbacks");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching public feedbacks:", error);
    throw error;
  }
};

// session API calls ===================================================

// Fetch available upcoming events for a mentor
export const fetchAvailableUpcomingEventsForMentor = async () => {
  try {
    const res = await axios.get("/session/available-upcoming-events");
    console.log("Fetched available upcoming events for mentor:", res.data); // Log fetched events
    if (res.status !== 200) {
      throw new Error("Unable to fetch available upcoming events for mentor");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching available upcoming events for mentor:", error);
    throw error;
  }
};

// Fetch upcoming sessions
export const fetchUpcomingSessions = async () => {
  try {
    const res = await axios.get("/session/upcoming-sessions");
    console.log("Fetched upcoming sessions:", res.data); // Log fetched upcoming sessions
    if (res.status !== 200) {
      throw new Error("Unable to fetch upcoming sessions");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching upcoming sessions:", error);
    throw error;
  }
};

// Fetch past sessions
export const fetchPastSessions = async () => {
  try {
    const res = await axios.get("/session/past-sessions");
    console.log("Fetched past sessions:", res.data); // Log fetched past sessions
    if (res.status !== 200) {
      throw new Error("Unable to fetch past sessions");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching past sessions:", error);
    throw error;
  }
};

//cancel a session

export const cancelSession = async (sessionId) => {
  try {
    const res = await axios.delete(`/session/cancel-session/${sessionId}`);
    if (res.status !== 200) {
      throw new Error("Unable to cancel session");
    }
    return res.data;
  } catch (error) {
    console.error("Error canceling session:", error);
    throw error;
  }
};

// Confirm Free Slot Booking
export const confirmFreeSlotBooking = async (bookingId) => {
  try {
    // Assuming you have an endpoint for confirming free slot bookings
    const res = await axios.post(`/session/confirm-free-slot`, { bookingId });
    if (res.status !== 200) {
      throw new Error("Unable to confirm free slot booking");
    }
    return res.data;
  } catch (error) {
    console.error("Error confirming free slot booking:", error);
    throw error;
  }
};

// calendar / booking API calls ==================================================

// MentorAvailabilityCalendar.jsx
export const fetchAvailability = async (mentorUuid) => {
  try {
    const res = await axios.get(`/calendar/${mentorUuid}`, {
      params: {
        start: moment().startOf("month").toISOString(),
        end: moment().endOf("month").toISOString(),
      },
    });
    if (res.status !== 200) {
      throw new Error("Unable to fetch availability");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching availability:", error);
    throw error;
  }
};

// MentorAvailabilityCalendar.jsx
export const addAvailability = async (start, end) => {
  try {
    const res = await axios.post("/calendar", {
      start,
      end,
      title: "1 Hour Session",
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Unable to add availability");
    }
    return res.data;
  } catch (error) {
    console.error("Error adding availability:", error);
    throw error;
  }
};

// MentorAvailabilityCalendar.jsx
export const bookSlot = async (eventId, skillId) => {
  try {
    const res = await axios.post(`/calendar/book/${eventId}`, {
      skillId,
    });
    if (res.status !== 200) {
      throw new Error("Unable to book slot");
    }
    return res.data;
  } catch (error) {
    console.error("Error booking slot:", error);
    throw error;
  }
};

// BookingDetails.jsx
export const fetchBookingDetails = async (bookingId) => {
  try {
    const response = await axios.get(`/calendar/booking-details/${bookingId}`);
    console.log("Booking details:", response.data); // Log booking details
    return response.data;
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw error;
  }
};

// delete availability
export const deleteAvailability = async (eventId) => {
  const response = await axios.delete(`/calendar/${eventId}`);
  return response.data;
};

// // Fetch upcoming sessions
// export const fetchUpcomingSessions = async () => {
//   try {
//     const res = await axios.get("/calendar/upcoming-sessions");
//     console.log("Fetched upcoming sessions:", res.data); // Log fetched upcoming sessions
//     if (res.status !== 200) {
//       throw new Error("Unable to fetch upcoming sessions");
//     }
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching upcoming sessions:", error);
//     throw error;
//   }
// };

// // Fetch past sessions
// export const fetchPastSessions = async () => {
//   try {
//     const res = await axios.get("/calendar/past-sessions");
//     console.log("Fetched past sessions:", res.data); // Log fetched past sessions
//     if (res.status !== 200) {
//       throw new Error("Unable to fetch past sessions");
//     }
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching past sessions:", error);
//     throw error;
//   }
// };

// // payment API calls ==================================================

// Create Stripe Payment Intent ----------------------------
// export const createStripePaymentIntent = async (amount, currency, userId, isMentee, bookingId, eventId) => {
export const createStripePaymentIntent = async (bookingId) => {
  try {
    // Ensure all required parameters are included
    const res = await axios.post("/payment/stripe/create-payment-intent", {
      // amount,
      // currency,
      // userId,
      // isMentee,
      bookingId,
      // eventId
    });

    console.log("Response from server:", res);

    if (res.status !== 200) {
      throw new Error("Unable to create Stripe payment intent");
    }

    return res.data; // Return the clientSecret or any other relevant data
  } catch (error) {
    console.error("Error creating Stripe payment intent:", error);
    throw error; // Re-throw the error to be handled by calling code
  }
};

// Search API calls ====================================================

// export const fetchMentors = async (query) => {
//   try {
//     const res = await axios.get(`/search`, {
//       params: { query: query.toString() }, // Ensure query is a string
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (res.status !== 200) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     const data = res.data;
//     console.log("Fetched mentors:", data); // Log fetched mentors
//     return data;
//   } catch (error) {
//     console.error("Error fetching mentors:", error);
//     throw error;
//   }
// };

// fetch mentors
export const fetchMentors = async (query) => {
  try {
    const res = await axios.get(`/search`, {
      params: query, // Send query as an object
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status !== 200) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = res.data;
    console.log("Fetched mentors:", data); // Log fetched mentors
    return data;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw error;
  }
};

// fetch mentor details
export const getMentorSkills = async (mentorUuid) => {
  try {
    const res = await axios.get(`/search/mentors/${mentorUuid}/skills`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = res.data;
    console.log(`Fetched skills for mentor ${mentorUuid}:`, data); // Log fetched skills
    return data;
  } catch (error) {
    console.error(`Error fetching skills for mentor ${mentorUuid}:`, error);
    throw error;
  }
};
