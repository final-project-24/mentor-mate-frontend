import React, { createContext, useContext, useEffect, useState } from "react";
import {
  checkUserAuth,
  loginUser,
  logoutUser,
  signupUser,
} from "../../utils/api-connector"; // Import the functions to interact with the API

// Create a context for authentication
const AuthContext = createContext(null);

// AuthProvider component to wrap around parts of the app that need access to auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the current user information
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in
  const [loading, setLoading] = useState(true); // State to track if any async operations are in progress

  // Effect to check user authentication status on component mount
  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const data = await checkUserAuth();
        if (data) {
          console.log("User authenticated:", data); // debug log
          // Set user data in state
          setUser({
            // id: data.id,
            // uuid: data.uuid,
            email: data.email,
            userName: data.userName,
            role: data.role,
            originalRole: data.originalRole, // Include originalRole
            image: data.image,
          });
          // Set isLoggedIn to true
          setIsLoggedIn(true);
        }
        // Set loading to false
        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication status:", error);
        // Set loading to false
        setLoading(false);
      }
    }
    checkAuthStatus();
  }, []);

  // // Effect to log isLoggedIn state whenever it changes / debug log
  // useEffect(() => {
  //   console.log("isLoggedIn state:", isLoggedIn);
  // }, [isLoggedIn]);

  // Function to handle user login
  const login = async (email, password) => {
    const data = await loginUser(email, password);
    if (data) {
      console.log("User logged in:", data); // debug log
      // Set user data in state
      setUser({
        // id: data.id,
        // uuid: data.uuid,
        email: data.email,
        userName: data.userName,
        role: data.role,
        originalRole: data.originalRole, // Include originalRole
        image: data.image,
      });
      // Set isLoggedIn to true
      setIsLoggedIn(true);
      // Set loading to false
      setLoading(false);
    }
  };

  // Function to handle user signup
  const signup = async (
    userName,
    email,
    password,
    confirmPassword,
    role,
    image
  ) => {
    const data = await signupUser(
      userName,
      email,
      password,
      confirmPassword,
      role,
      image
    );
    if (data) {
      console.log("User signed up:", data); // debug log
      // Set user data in state
      setUser({
        // id: data.id,
        // uuid: data.uuid,
        email: data.email,
        userName: data.userName,
        role: data.role,
        originalRole: data.originalRole, // Include originalRole
        image: data.image,
      });
      // Set isLoggedIn to true
      setIsLoggedIn(true);
      // Set loading to false
      setLoading(false);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    console.log("Logging out user..."); // debug log
    await logoutUser();
    setIsLoggedIn(false); // Set isLoggedIn to false
    setUser(null); // Clear user data
    setLoading(false); // Set loading to false
    window.location.reload(); // Reload the page to clear any staged data
  };

  return (
    // Provide the auth state and functions to the rest of the app
    <AuthContext.Provider
      value={{
        user, // User data object - use it in the whole app to get user details - also includes role for role-based rendering
        isLoggedIn, // Check if user is logged in- use it in the whole app to show/hide content
        loading, // Check if any async operations are in progress - use it to show loading indicators
        login, // only needed in login component
        logout, // only needed in logout component
        signup, // only needed in signup component
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => useContext(AuthContext);
