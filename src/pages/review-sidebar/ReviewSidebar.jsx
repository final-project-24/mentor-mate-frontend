import React, { useState } from 'react';
import './ReviewSidebar.css';
import { Link } from 'react-router-dom';
// Import images directly from src/assets/images
import profilePic1 from '../../assets/images/profile1.jpeg';
import profilePic2 from '../../assets/images/profile2.jpeg';
import profilePic3 from '../../assets/images/profile3.jpg';
import profilePic4 from '../../assets/images/profile4.jpeg';


const Review = ({ name, topic, feedback, rating, profilePic }) => {
    return (
        <div className="review">
            <img src={profilePic} alt="Profile Picture" className="profile-pic" />
            <div className="review-content">
                <h4 className="review-name">{name}</h4>
                <p className="review-topic">Topic: {topic}</p>
                <p className="review-feedback">"{feedback}"</p>
                <div className="rating">
                    {'★'.repeat(rating)}
                    {'☆'.repeat(5 - rating)}
                </div>
            </div>
        </div>
    );
};

// Componente Sidebar para manejar la barra lateral y su lógica
const Sidebar = ({ isOpen, closeSidebar, reviews }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="closeBtn" onClick={closeSidebar}>×</button>
            <h2>User feedbacks</h2>
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
            <Link to="/feedback" className="feedbackLink">Go to Feedback</Link>
        </div>
    );
};

// Componente principal ReviewSidebar que integra Sidebar y maneja su estado
const ReviewSidebar = () => {
    //  `true` to display it by default
    const [isOpen, setIsOpen] = useState(true);

    const closeSidebar = () => {
        setIsOpen(false);
    };

    const openSidebar = () => {
        setIsOpen(true);
    };

    // Use imported images directly in the reviews array
    const reviews = [
        {
            name: 'John Doe',
            topic: 'Web Development',
            feedback: 'Great mentor, very knowledgeable and helpful!',
            rating: 4,
            profilePic: profilePic1
        },
        {
            name: 'Jane Smith',
            topic: 'React',
            feedback: 'I learned a lot, the sessions were very interactive!',
            rating: 5,
            profilePic: profilePic2
        },
        {
            name: 'Tom Brown',
            topic: 'CSS',
            feedback: 'Good explanations and examples, highly recommend.',
            rating: 4,
            profilePic: profilePic3
        },
        {
            name: 'Emily White',
            topic: 'C++',
            feedback: 'The mentor was patient and answered all my questions.',
            rating: 5,
            profilePic: profilePic4
        }
    ];

    return (
        <div>
            {isOpen ? (
                <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} reviews={reviews} />
            ) : (
                <button className="smallOpenBtn" onClick={openSidebar}>
                    ➤
                </button>
            )}
        </div>
    );
};

export default ReviewSidebar;
