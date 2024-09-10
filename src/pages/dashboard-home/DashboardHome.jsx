// import React from "react";
// import { Link } from "react-router-dom";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import "./DashboardHome.css";
import Loading from "../../components/loading/Loading";
import NotLoggedInMessage from "../../components/not-logged-in-message/NotLoggedInMessage";
import LoginButton from "../../components/login-button/LoginButton";
import InfoCard from "../../components/info-card/InfoCard.jsx";

export default function DashboardHome() {
  const { isLoggedIn, user, loading } = useAuthContext();

  // If the page is still loading, display a loading indicator
  if (loading) {
    return <Loading />;
  }

  // If the user is not logged in, display a message to prompt them to log in
  if (!user) {
    return <NotLoggedInMessage />;
  }

  return (
    <div id="dashboard-home-container  ">
      {isLoggedIn && (
        <div className="mt-[80px] text-center text-xl pb-2 md:pb-5 ">
          <h1>
            Welcome
            <p className="text-accent"> {user.userName}</p>
          </h1>
        </div>
      )}
      {isLoggedIn && (
        <div className="">
          <div className="p-3 md:h-[500px]">
            <InfoCard
              image={user.image}
              userName={user.userName}
              role={user.role}
              email={user.email}
            />
          </div>
          {/* Keep ReviewSidebar from nacho branch */}
          {/* <ReviewSidebar /> */}
        </div>
      )}
    </div>
  );
}
