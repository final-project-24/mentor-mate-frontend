import "./InfoCard.css";

export default function InfoCard({
  id,
  image,
  userName,
  email,
  role,
  skills,
  start,
  end,
  price,
}) {
  // console.log("ID:", id); //
  // console.log("Image:", image); //
  // console.log("Name:", userName); //
  // console.log("Email:", email); //
  // console.log("Role:", role); //
  // console.log("Skills:", skills); //
  // console.log("Start:", start); //
  // console.log("End:", end); //
  // console.log("Price:", price); //

  return (
    <>
      <div className="info-card">
        {image && (
          <img className="info-card-image" src={image} alt={userName} />
        )}

        <div className="info-card-content">
          {/* {role && <span className="user-status">{role}</span>} */}

          {userName && <h3 className="info-card-header ">{userName}</h3>}

          {email && <p className="info-card-content ">{email}</p>}

          <p className="info-card-content ">Topic: English C1.1 - Reading</p>

          {skills && skills.length > 0 && (
            <ul className="skills">
              <li>Skills:</li>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          )}

          {(start || end) && (
            <ul className="info-card-content">
              <li>Date and Time:</li>
              {start && <li>Start: {start}</li>}
              {end && <li>End: {end}</li>}
            </ul>
          )}

          {price && <p className="info-card-content">Price: {price} </p>}
        </div>
      </div>
    </>
  );
}
