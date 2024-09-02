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

// feedback API calls ==================================================

// submit feedback
export const submitFeedback = async (feedbackData) => {
  try {
    const res = await axios.post("/feedback", feedbackData);
    if (res.status !== 201) {
      throw new Error("Unable to submit feedback");
    }
    return res.data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};

// session API calls ===================================================

// fetch session data
export const fetchSessionData = async () => {
  try {
    const response = await axios.get("/session");
    return response.data;
  } catch (error) {
    console.error("Error fetching session data:", error);
    throw new Error("Failed to fetch session data");
  }
};

// calendar API calls ==================================================

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
      title: "Available",
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
export const bookSlot = async (eventId) => {
  try {
    const res = await axios.post(`/calendar/book/${eventId}`);
    if (res.status !== 200) {
      throw new Error("Unable to book slot");
    }
    return res.data;
  } catch (error) {
    console.error("Error booking slot:", error);
    throw error;
  }
};

// // payment API calls ==================================================

// Create Stripe Payment Intent ----------------------------
// export const createStripePaymentIntent = async (amount, currency, userId, isMentee, bookingId, eventId) => {
  export const createStripePaymentIntent = async (bookingId) => {
    try {
      // Ensure all required parameters are included
      const res = await axios.post('/payment/stripe/create-payment-intent', {
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
  
  

