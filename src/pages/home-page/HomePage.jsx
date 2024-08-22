import "./HomePage.css";
import Layout from "../../components/layout/Layout";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
// ..
import Schedule from "../schedule/Schedule";
import InfoCard from "../../components/info-card/InfoCard.jsx";

const HomePage = () => {
  const { user, isLoggedIn } = useAuthContext();

  const getWelcomeMessage = () => {
    if (!isLoggedIn) {
      return "Welcome to MentorMate";
    }
    return user.role === "mentor" ? "Welcome Mentor" : "Welcome Mentee";
  };

  const userNameDisplay = () => {
    if (!isLoggedIn) {
      return "Your learning platform";
    }
    return user.userName;
  };

  return (
    <Layout>
      <section id="home" className="pt-[150px] mx-2">
        <h1 className="text-3xl text-center text-accent">
          {getWelcomeMessage()}
        </h1>
        <p className="text-2xl text-center text-neutral py-4">
          {userNameDisplay()}
        </p>

        {isLoggedIn && (
          <div className="items-center w-full lg:mx-auto border border-red-500">
            <div className="flex flex-col-reverse px-20 lg:w-1/2 lg:mx-auto justify-center border border-red-500">
              {/* <UserProfile /> */}
              <InfoCard
                image={user.image}
                userName={user.userName}
                role={user.role}
                email={user.email}
              />
            </div>
            
          </div>
        )}
            <div className="flex-1 lg:w-3/4 mx-auto border border-red-500">
              <Schedule />
            </div>
         
       
      </section>
    </Layout>
  );
};

export default HomePage;

{
  /* Uncomment and modify as needed */
}
{
  /* <section className="flex py-10">
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
          Some random comments about platform
        </div>
      </section> */
}
