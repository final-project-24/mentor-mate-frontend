// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./MentorList.css";
// import InfoCard from "../info-card/InfoCard";

// const MentorList = ({ mentors = [] }) => {
//   console.log("Mentors prop:", mentors); // Debugging line

//   if (!mentors.length) {
//     return <p className="mentor-list-error-message">No mentors found.</p>;
//   }

//   const uniqueMentors = Array.from(new Set(mentors.map(mentor => mentor.uuid)))
//     .map(uuid => mentors.find(mentor => mentor.uuid === uuid));

//   console.log("Unique Mentors:", uniqueMentors); // Debugging line

//   const slidesToShow = Math.min(uniqueMentors.length, 3);

//   const settings = {
//     dots: true,
//     infinite: uniqueMentors.length > slidesToShow,
//     speed: 500,
//     slidesToShow: slidesToShow,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: Math.min(uniqueMentors.length, 2),
//           slidesToScroll: 1,
//           infinite: uniqueMentors.length > 2,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 1,
//           infinite: uniqueMentors.length > 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="mentor-list-container">
//         <Slider {...settings}>
//           {uniqueMentors.map((mentor) => (
//             <div key={mentor.uuid} className="mentor-item">
//               <InfoCard
//                 image={mentor.image}
//                 userName={mentor.userName}
//                 email={mentor.email}
//                 role={mentor.role}
//                 skills={mentor.skills}
//                 start={mentor.start}
//                 end={mentor.end}
//                 price={mentor.price}
//               />
//             </div>
//           ))}
//         </Slider>
//     </div>
//   );
// };

// export default MentorList;

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MentorList.css";
import { useBookingContext } from "../../store/booking-context/BookingContext";
import InfoCard from "../info-card/InfoCard";

const MentorList = () => {
  const { mentors } = useBookingContext();
  const [searchAttempted, setSearchAttempted] = useState(false);

  useEffect(() => {
    if (mentors.length > 0) {
      setSearchAttempted(true);
    }
  }, [mentors]);

  console.log("Hey there! I'm the MentorList component!"); // Debugging log

  if (searchAttempted && !mentors.length) {
    return <p className="mentor-list-error-message">No mentors found.</p>;
  }

  const uniqueMentors = Array.from(
    new Set(mentors.map((mentor) => mentor.uuid))
  ).map((uuid) => mentors.find((mentor) => mentor.uuid === uuid));

  // console.log("Unique Mentors:", uniqueMentors); // Debugging line

  const slidesToShow = Math.min(uniqueMentors.length, 3) || 1; // Ensure slidesToShow is at least 1

  const settings = {
    dots: true,
    infinite: uniqueMentors.length > slidesToShow,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(uniqueMentors.length, 2),
          slidesToScroll: 1,
          infinite: uniqueMentors.length > 2,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: uniqueMentors.length > 1,
        },
      },
    ],
  };

  return (
    <div className="mentor-list-container w-[90%] mx-auto pt-5 pb-10 md:w-full ">
      <Slider {...settings}>
        {uniqueMentors.map((mentor) => (
          <div key={mentor.uuid} className="mentor-item md:px-2 ">
            <InfoCard
              mentorUuid={mentor.uuid}
              image={mentor.image}
              userName={mentor.userName}
              skills={mentor.skills}
              // email={mentor.email}
              // role={mentor.role}
              // start={mentor.start}
              // end={mentor.end}
              // price={mentor.price}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MentorList;
