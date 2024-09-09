import "./NotFound.css";
import Layout from "../../components/layout/Layout.jsx";

const NotFound = () => {
  console.log("Hey there! I'm the Not Found Page."); // Debug log

  return (
    <>
      <Layout>
        <div id="not-found-container">
          <p>404 - PAGE NOT FOUND 😔</p>
        </div>
      </Layout>
    </>
  );
};

export default NotFound;
