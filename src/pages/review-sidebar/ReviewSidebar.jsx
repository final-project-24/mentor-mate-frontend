import React, { useState, useEffect, useRef } from "react";
import "./ReviewSidebar.css";
import { Link } from "react-router-dom";
import iconUrl from "../../assets/images/icon.svg";

import profilePic1 from "../../assets/images/profile1.jpeg";
import profilePic2 from "../../assets/images/profile2.jpeg";
import profilePic3 from "../../assets/images/profile3.jpg";
import profilePic4 from "../../assets/images/profile4.jpeg";
import profilePic5 from "../../assets/images/profile5.jpg";
import profilePic6 from "../../assets/images/profile6.jpeg";
import profilePic7 from "../../assets/images/profile7.jpg";


const Review = ({ name, topic, feedback, rating, profilePic }) => {
  return (
    <div className="review">
      <img src={profilePic} alt="Profile Picture" className="profile-pic" />
      <div className="review-content">
        <h4 className="review-name">{name}</h4>
        <p className="review-topic">Topic: {topic}</p>
        <p className="review-feedback">"{feedback}"</p>
        <div className="rating">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </div>
      </div>
    </div>
  );
};

// Componente Sidebar para manejar la barra lateral y su lógica
const Sidebar = ({ isOpen, toggleSidebar, reviews, currentIndex }) => {
  return (
    <div className={`sidebar ${isOpen ? "" : "closed"}`}>
      <h2 className="user-feedbacks-heading">
        User feedbacks
        <img src={iconUrl} alt="Icon" className="feedback-icon" />
      </h2>

      <div className="carousel">
        {reviews.slice(currentIndex, currentIndex + 1).map((review, index) => (
          <Review
            key={index}
            name={review.name}
            topic={review.topic}
            feedback={review.feedback}
            rating={review.rating}
            profilePic={review.profilePic}
          />
        ))}
      </div> {/* Added closing div for .carousel */}

      <Link to="/feedback" className="feedbackButton">
        Go to Feedback
      </Link>
    </div>
  );
};




const ReviewSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // State to manage the current review index
  const reviews = [
    {
      name: "John Doe",
      topic: "Web Development",
      feedback: "Great mentor, very knowledgeable and helpful!",
      rating: 4,
      profilePic: profilePic1,
    },
    {
      name: "Jane Smith",
      topic: "React",
      feedback: "I learned a lot, the sessions were very interactive!",
      rating: 5,
      profilePic: profilePic2,
    },
    {
      name: "Tom Brown",
      topic: "CSS",
      feedback: "Good explanations and examples, highly recommend.",
      rating: 4,
      profilePic: profilePic3,
    },
    {
      name: "Emily White",
      topic: "C++",
      feedback: "The mentor was patient and answered all my questions.",
      rating: 5,
      profilePic: profilePic4,
    },
    {
      name: "Susan Saharan",
      topic: "Python",
      feedback: "The mentor was patient and answered all my questions.",
      rating: 5,
      profilePic: profilePic5,
    },
    {
      name: "Romina Chloe",
      topic: "English",
      feedback: "Great class, I'll book another one for sure!.",
      rating: 5,
      profilePic: profilePic6,
    },
    {
      name: "Carlos Villagran",
      topic: "React",
      feedback: "Absolutely wonderful, I'll book another one for sure!.",
      rating: 5,
      profilePic: profilePic7,
    },
  ];

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // Automatically cycle through reviews
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000); // Change review every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [reviews.length]);

  return (
    <div>
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        reviews={reviews}
        currentIndex={currentIndex}
      />
      <button className="smallOpenBtn" onClick={toggleSidebar}>
        {isOpen ? "×" : "➤"}
      </button>
    </div>
  );
};

export default ReviewSidebar;
