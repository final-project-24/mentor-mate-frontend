
// Playground.jsx
import React from "react";
import Layout from "../../components/layout/Layout.jsx";
import UserProfile from "../../components/user-profile/UserProfile.jsx";
import Schedule from "../schedule/Schedule.jsx";
// import "./Playground.css";
// import Loading from "../../components/loading/Loading.jsx";
// import Layout from "../../components/layout/Layout.jsx";
// import UserShowcase from "../../components/showcase-users/ShowcaseUsers.jsx";

import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
// import InfoCard from "../../components/info-card/InfoCard.jsx";

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

  // const { loading, isLoggedIn, user } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn state and user object

  // if (loading) {
  //   return <Loading />;
  // } // or any other loading indicator

  // return (
  //   <>
  //     <Layout>
  //       {isLoggedIn && <h1 className="greetings">Welcome, {user.userName}!</h1>}
  //       {/* {isLoggedIn && user.role === "mentor" && <h2>MENTOOORRRRRRR</h2>} */}
  //       {isLoggedIn && user.role.includes("mentor") && <h2>MENTOOORRRRRRR</h2>}
  //       {/* {isLoggedIn && user.role === "mentee" && <h2>MENTEEEEEEEEEE</h2>} */}
  //       {isLoggedIn && user.role.includes("mentee") && <h2>MENTEEEEEEEEEE</h2>}
  //       <div className="test">Playground!</div>
  //       {isLoggedIn && (
  //         <InfoCard
  //           image={user.image}
  //           userName={user.userName}
  //           role={user.role}
  //           email={user.email}
  //         />
  //       )}
  //       {isLoggedIn && <UserShowcase />}
  //     </Layout>
  //   </>
    
  );
};

export default Playground;
