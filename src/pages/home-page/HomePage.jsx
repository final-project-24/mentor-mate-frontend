import "./HomePage.css";
import Layout from "../../components/layout/Layout";

import ReviewSidebar from "../review-sidebar/ReviewSidebar";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";

const HomePage = () => {
  const { user, isLoggedIn } = useAuthContext();

  const getWelcomeMessage = () => {
    if (!isLoggedIn) {
      return "Welcome to MentorMate";
    } else if (user.role === "mentor") {
      return "Welcome Mentor";
    } else if (user.role === "mentee") {
      return "Welcome Mentee";
    }
  };

  const userNameDisplay = () => {
    if (!isLoggedIn) {
      return "Your learning platform";
    } else if (user.role === "mentor" || user.role === "mentee") {
      return user.userName;
    }
  };


  return (
    <Layout>
      <section id="home" className="pt-[150px] mx-20">
        <h1 className="text-3xl text-center text-accent">
          {getWelcomeMessage()}
        </h1>
        <p className="text-2xl text-center text-neutral py-4">

          {userNameDisplay()}
        </p>
        {/* Keep ReviewSidebar from nacho branch */}
        <ReviewSidebar />
        {/* Keep comments section from main branch */}
        <section className="flex py-10">


          <div className="border border-red-500 w-1/4 h-[400px] mx-2">
            Some random comments about platform
          </div>
          <div className="border border-red-500 w-1/4 h-[400px] mx-2">
            Some random comments about platform
          </div>
          <div className="border border-red-500 w-1/4 h-[400px] mx-2">
            Some random comments about platform
          </div>
          <div className="border border-red-500 w-1/4 h-[400px] mx-2">

          </div>
        </section>
      </section>
    </Layout>
  );
};

export default HomePage;
