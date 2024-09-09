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
    <div id="dashboard-home-container">
      {isLoggedIn ? (
        <>
          <h1>Welcome {user.userName}</h1>
        </>
      ) : (
        <div className="login-message-container">
          <p>Please log in to access the dashboard.</p>
          <LoginButton />
        </div>
      )}
      {isLoggedIn && (
        <div>
          <div>
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
