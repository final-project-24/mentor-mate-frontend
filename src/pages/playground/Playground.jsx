// Playground.jsx
import React from "react";
import Layout from "../../components/layout/Layout.jsx";
import UserProfile from "../../components/user-profile/UserProfile.jsx";
import Schedule from "../schedule/Schedule.jsx";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";

const Playground = () => {
  const { isLoggedIn, user } = useAuthContext();

  return (
    <Layout>
      {isLoggedIn && (
        <h1 className="greetings mt-[100px] text-center text-4xl py-4 text-accent">
          Welcome, {user.userName}!
        </h1>
      )}
      {isLoggedIn && user.role === "mentor" && (
        <h2 className="text-center hidden">You are MENTOOORRRRRRR</h2>
      )}
      {isLoggedIn && user.role === "mentee" && (
        <h2 className="text-center">MENTEEEEEEEEEE</h2>
      )}
      <div className="flex border border-red-500 ">
        {isLoggedIn && (
          <div className="flex w-1/3 items-center justify-center border border-red-500 ">
            <UserProfile />
          </div>
        )}
        {isLoggedIn && user.role === "mentor" && (
          <div className="flex-1 border border-red-500">
            <Schedule />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Playground;
