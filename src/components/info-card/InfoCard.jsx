import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../store/booking-context/BookingContext";
import "./InfoCard.css";
import ToggleButton from "../toggle-button/ToggleButton";

export default function InfoCard({
  // _id,
  uuid,
  mentorUuid,
  image,
  userName,
  email,
  role,
  skills,
  start,
  end,
  price,
}) {
  // console.log("ID:", _id); //
  // console.log("UUID:",  mentorUuid); //
  // console.log("Image:", image); //
  // console.log("Name:", userName); //
  // console.log("Email:", email); //
  // console.log("Role:", role); //
  // console.log("Skills:", skills); //
  // console.log("Start:", start); //
  // console.log("End:", end); //
  // console.log("Price:", price); //

  const navigate = useNavigate();
  const { setSelectedMentorUuid, setSelectedSkill } = useBookingContext();

  const handleSkillClick = (mentorUuid, skill) => {
    console.log("Mentor UUID:", mentorUuid); // Debugging log
    console.log("Skill:", skill); // Debugging log
    setSelectedMentorUuid(mentorUuid); // Set the selected mentor UUID in the booking context
    setSelectedSkill(skill); // Set the selected skill in the booking context
    navigate("/dashboard/schedule"); // Navigate to the schedule page
  };

  return (
    <>
      <div className="info-card w-1/2">
        {image && (
          <img className="info-card-image" src={image} alt={userName} />
        )}

        <div className="info-card-content">
          {/* user role */}
          {role && <span className="user-status">{role}</span>}

          {/* user name */}
          {userName && <h3 className="info-card-header">{userName}</h3>}

          {/* mail */}
          {email && <p className="info-card-content">{email}</p>}

          {/* skills */}
          {skills && skills.length > 0 && (
            <ul className="skills">
              <li>Book a session</li>
              {skills.map((skill, index) => (
                <li key={index}>
                  <p>
                    <ToggleButton
                      onToggle={() => handleSkillClick(mentorUuid, skill)}
                      buttonName={skill.protoSkillId.protoSkillTitle}
                      className="button-type-standard"
                    />
                  </p>
                </li>
              ))}
            </ul>
          )}

          {/* session dates */}
          {(start || end) && (
            <ul className="info-card-content">
              <li>Date and Time:</li>
              {start && <li>Start: {start}</li>}
              {end && <li>End: {end}</li>}
            </ul>
          )}

          {/* price */}
          {price && <p className="info-card-content">Price: {price} </p>}
        </div>
      </div>
    </>
  );
}
