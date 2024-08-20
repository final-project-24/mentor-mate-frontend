import "./Playground.css";
import Loading from "../../components/loading/Loading.jsx";
import Layout from "../../components/layout/Layout.jsx";
import UserShowcase from "../../components/showcase-users/ShowcaseUsers.jsx";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import InfoCard from "../../components/info-card/InfoCard.jsx";

const Playground = () => {
  const { loading, isLoggedIn, user } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn state and user object

  if (loading) {
    return <Loading />;
  } // or any other loading indicator

  return (
    <>
      <Layout>
        {isLoggedIn && <h1 className="greetings">Welcome, {user.userName}!</h1>}
        {/* {isLoggedIn && user.role === "mentor" && <h2>MENTOOORRRRRRR</h2>} */}
        {isLoggedIn && user.role.includes("mentor") && <h2>MENTOOORRRRRRR</h2>}
        {/* {isLoggedIn && user.role === "mentee" && <h2>MENTEEEEEEEEEE</h2>} */}
        {isLoggedIn && user.role.includes("mentee") && <h2>MENTEEEEEEEEEE</h2>}
        <div className="test">Playground!</div>
        {isLoggedIn && (
          <InfoCard
            image={user.image}
            userName={user.userName}
            role={user.role}
            email={user.email}
          />
        )}
        {isLoggedIn && <UserShowcase />}
      </Layout>
    </>
  );
};

export default Playground;
