import "./HomePage.css";
import Layout from "../../components/layout/Layout";
<<<<<<< HEAD
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

=======
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
  
  const userNameDisplay = ()=> {
    if (!isLoggedIn) {
      return " Your learning platform"
    } else if (user.role === "mentor" || user.role === "mentee") {
      return user.userName
    }
  }
  
>>>>>>> 5f6d193a15707f6c40c2dc12e90ff4f3c39c06a5
  return (
    <Layout>
      <section id="home" className="pt-[150px] mx-20">
        <h1 className="text-3xl text-center text-accent">
          {getWelcomeMessage()}
        </h1>
        <p className="text-2xl text-center text-neutral py-4">
<<<<<<< HEAD
          {userNameDisplay()}
        </p>
        {/* Keep ReviewSidebar from nacho branch */}
        <ReviewSidebar />
        {/* Keep comments section from main branch */}
        <section className="flex py-10">
=======
         {userNameDisplay()}
        </p>
        <section className="flex py-10   ">
>>>>>>> 5f6d193a15707f6c40c2dc12e90ff4f3c39c06a5
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
<<<<<<< HEAD
            Some random comments about platform
=======
            Some random comm ents about platform
>>>>>>> 5f6d193a15707f6c40c2dc12e90ff4f3c39c06a5
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default HomePage;
