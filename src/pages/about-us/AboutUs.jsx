import Layout from "../../components/layout/Layout";
import about from "../../assets/images/about.jpg";

import React from 'react';

const AboutUs = () => {
  return (
    <Layout>
    <section className="">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="max-w-lg">
            <h3 className="text-3xl font-extrabold text-gray-100 sm:text-4xl ">About Us</h3>
            <p className="mt-4 text-grey-100 text-lg">
            At Your Mentormate, we believe in the power of mentorship to transform careers and lives. 
            Our mission is to bridge the gap between aspiring professionals and experienced mentors who provide tailored, practical guidance in key 
            fields like technology, language, and career development.
            </p>
            <h3 className="text-3xl font-extrabold text-black sm:text-4xl">Personalized Mentorship Tailored to Your Unique Journey</h3>
            <p className="mt-4 text-lg"style={{ color: "#333" }}>
            We understand that everyone's journey is unique, so we’ve built a platform that offers
             personalized mentorship designed to fit your specific goals and industry. 
            Whether you’re just starting out, switching careers, or looking to enhance your skills,
             we connect you with mentors who are aligned with your ambitions, 
             helping you make informed decisions and progress in meaningful ways.
            </p>
            <h3 className="text-3xl font-extrabold text-black sm:text-4xl">Learn Your Way, Grow Together</h3>
            <p className="mt-4 text-grey-600 text-lg">
            Learning should be flexible, which is why our platform allows you to access mentorship on your terms. 
            Our community of learners and mentors is committed to growth, collaboration, 
            and success, ensuring you have the support you need both during and beyond your 
            sessions. We’re here to help you achieve continuous improvement, providing resources and feedback every step of the way.
            Let us guide you toward the next step in your professional journey.
             <br /> Together, we can shape your future.
            </p>
            {/* <div className="mt-8">
              <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                Learn more about us <span className="ml-2">&#8594;</span>
              </a>
            </div> */}
          </div>
          <div className="mt-12 md:mt-0">
          <img
                src={about} 
                alt="About us"
                className="w-full h-auto max-w-lg md:max-w-xl lg:max-w-2xl rounded-lg shadow-md object-cover"
              />
            </div>
            
        </div>
      </div>
    </section>
    </Layout>
  );
};

export default AboutUs;
