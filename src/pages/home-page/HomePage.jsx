import "./HomePage.css";
import Layout from "../../components/layout/Layout";
import ReviewSidebar from "../review-sidebar/ReviewSidebar";

const HomePage = () => {
  return (
    <Layout>
      <section id="home">
        <p>
          Home: This is where the user will land when they first visit the
          application.
        </p>
        <ReviewSidebar />
      </section>
    </Layout>
  );
};

export default HomePage;
