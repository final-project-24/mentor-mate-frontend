import React from "react";
import Layout from "../../components/layout/Layout";
import ReviewSidebar from "../../components/review-sidebar/ReviewSidebar";
import auimage from "../../assets/images/about-us-image.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import {
  faBookOpenReader,
  faChalkboardUser,
  faUserGraduate,faAward,
} from "@fortawesome/free-solid-svg-icons"; // Correct the icon import


function WhyWe() {
  return (
    <Layout>
      <section>
        <div className="mt-[90px] mb-[80px]">
          <h1 className="text-center text-accent text-3xl ">
            Welcome to MentorMate - Your Gateway to Growth and Success!
          </h1>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2
                className="font-heading mb-4 bg-green-500 text-black-100 
        px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold 
        tracking-widest text-black uppercase title-font mt-10"
              >
                Why choose us?
              </h2>
              <p
                className="font-heading mt-2 text-3xl leading-8 font-semibold 
        tracking-tight text-gray-900 sm:text-4xl"
              >
                Our mission: Empowering growth through personalized mentorship
                to achieve goals and unlock potential.
              </p>
              <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
                By choosing us, you are not just getting a mentor—you're joining
                a community committed to your success.
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <img
                src={auimage} // Imagen importada
                alt="About us"
                className="w-full h-auto max-w-lg rounded-lg shadow-md object-cover"
              />
            </div>

            {/* ---------------------- */}
            <ReviewSidebar />
            {/* ---------------------- */}

            <div className="mt-10">
              <dl
                className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 
        md:gap-x-8 md:gap-y-10"
              >
                <div className="relative">
                  <dt>
                    <div
                      className="absolute flex items-center justify-center 
              h-12 w-12 rounded-md bg-primary-500 text-white"
                    >
                      <FontAwesomeIcon
                        icon={faBookOpenReader}
                        className="text-4xl text-black"
                      />
                    </div>

                    <p
                      className="font-heading ml-16 text-lg leading-6 
              font-bold text-gray-700"
                    >
                      Tailored Mentorship
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    We connect you with mentors who align with your goals and
                    industry, ensuring you receive guidance that's relevant and
                    impactful.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div
                      className="absolute flex items-center justify-center 
              h-12 w-12 rounded-md bg-primary-500 text-white"
                    >
                      <FontAwesomeIcon
                        icon={faChalkboardUser}
                        className="text-4xl text-black"
                      />
                    </div>
                    <p
                      className="font-heading ml-16 text-lg leading-6 
              font-bold text-gray-700"
                    >
                      Flexible Learning:{" "}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Whether you're a student, a career switcher, or a
                    professional looking to upskill, our platform offers
                    flexible learning paths that fit your schedule and needs.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div
                      className="absolute flex items-center justify-center 
              h-12 w-12 rounded-md bg-primary-500 text-white"
                    >
                      <FontAwesomeIcon
                        icon={faUserGraduate}
                        className="text-4xl text-black"
                      />
                    </div>
                    <p
                      className="font-heading ml-16 text-lg leading-6 
              font-bold text-gray-700"
                    >
                      Community-Driven Growth
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Join a thriving community of learners and mentors who are
                    dedicated to mutual growth and success, providing you with a
                    support network that extends beyond your mentorship
                    sessions.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <FontAwesomeIcon icon={faAward} 
                    className="text-5xl text-black"
                    />
                    </div>
                    <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                      Continuous Improvement
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    We don't just match you with a mentor and leave it at that.
                    We provide ongoing feedback and resources to ensure you are
                    always moving forward in your career.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default WhyWe;
