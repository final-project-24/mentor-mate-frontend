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
export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`/user/${id}`);
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

// feedback
export const submitFeedback = async (feedbackData) => {
  try {
    const res = await axios.post("/feedback/", feedbackData);
    if (res.status !== 200) {
      throw new Error("Unable to submit feedback");
    }
    return res.data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};

// calendar API calls ==================================================

// fetch availability
export const fetchAvailability = async (mentorId) => {
  try {
    const res = await axios.get(`/calendar/${mentorId}`, {
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

// add availability
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

// book slot
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
