import React, { useState, useRef } from "react";
import "./ReviewSidebar.css";
import { Link } from "react-router-dom";
import iconUrl from "../../assets/images/icon.svg";

import profilePic1 from "../../assets/images/profile1.jpeg";
import profilePic2 from "../../assets/images/profile2.jpeg";
import profilePic3 from "../../assets/images/profile3.jpg";
import profilePic4 from "../../assets/images/profile4.jpeg";

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
const Sidebar = ({ isOpen, toggleSidebar, reviews }) => {
  return (
    <div className={`sidebar ${isOpen ? "" : "closed"}`}>
      <h2 className="user-feedbacks-heading">
        User feedbacks
        <img src={iconUrl} alt="Icon" className="feedback-icon" />
      </h2>

      {reviews.map((review, index) => (
        <Review
          key={index}
          name={review.name}
          topic={review.topic}
          feedback={review.feedback}
          rating={review.rating}
          profilePic={review.profilePic}
        />
      ))}
      <Link to="/feedback" className="feedbackButton">
        Go to Feedback
      </Link>
    </div>
  );
};


// Componente principal ReviewSidebar que integra Sidebar y maneja su estado

const ReviewSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef(null); // Reference to the sidebar

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

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
  ];

  // Function to handle scrolling
  const scrollSidebar = (direction) => {
    if (sidebarRef.current) {
      const scrollAmount = 100; // Amount of pixels to scroll
      if (direction === 'up') {
        sidebarRef.current.scrollTop -= scrollAmount;
      } else if (direction === 'down') {
        sidebarRef.current.scrollTop += scrollAmount;
      }
    }
  };

  return (
    <div>
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        reviews={reviews}
        // scrollSidebar={scrollSidebar}
      />
      <button className="smallOpenBtn" onClick={toggleSidebar}>
        {isOpen ? '×' : '➤'}
      </button>
    </div>
  );
};

export default ReviewSidebar;
