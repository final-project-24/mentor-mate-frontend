import React, { useState, useEffect } from "react";
import "./ReviewSidebar.css";
import { Link } from "react-router-dom";
import iconUrl from "../../assets/images/icon.svg";
import reviews from "./ReviewData";

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

const Sidebar = ({ isOpen, toggleSidebar, reviews, currentIndex }) => {
  return (
    <div className={`sidebar ${isOpen ? "" : "closed"}`}>
      <h2 className="user-feedbacks-heading">
        User feedbacks
        <img src={iconUrl} alt="Icon" className="feedback-icon" />
      </h2>

      <div className="carousel">
        {reviews.slice(currentIndex, currentIndex + 2).map((review, index) => (
          <Review
            key={index}
            name={review.name}
            topic={review.topic}
            feedback={review.feedback}
            rating={review.rating}
            profilePic={review.profilePic}
          />
        ))}
      </div>

      <Link to="/feedback" className="feedbackButton">
        Go to Feedback
      </Link>
    </div>
  );
};

const ReviewSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // State to manage the current review index

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // Automatically cycle through reviews
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % reviews.length);
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
