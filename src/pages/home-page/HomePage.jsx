import "./HomePage.css";
import Layout from "../../components/layout/Layout";

const HomePage = () => {
  return (
    <Layout>
      <section id="home" className="pt-[150px] mx-20">
        <h1 className="text-3xl text-center text-accent">
          Welcome to MentorMate
        </h1>
        <p className="text-2xl text-center text-neutral py-4">
          Your learning platform
        </p>
        <section className="flex py-10   ">
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
            Some random comm
            ents about platform
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default HomePage;
