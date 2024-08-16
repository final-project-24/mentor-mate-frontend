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
}) {
  console.log("ID:", id); //
  console.log("Image:", image); //
  console.log("Name:", userName); //
  console.log("Email:", email); //
  console.log("Role:", role); //
  console.log("Skills:", skills); //
  console.log("Start:", start); //
  console.log("End:", end); //

  return (
    <>
      <div className="user-card">
        {image && (
          <img className="user-card-image" src={image} alt={userName} />
        )}

        <div className="user-card-content">
          {role && <span className="user-status">{role}</span>}

          {userName && <h3 className="content">Mentor: {userName}</h3>}

          {email && <p className="user-description">{email}</p>}

          <p className="content">Topic: English C1.1 - Reading</p>

          {skills && skills.length > 0 && (
            <ul className="skills">
              <li>Skills:</li>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          )}

          {(start || end) && (
            <ul className="content">
              <li>Date and Time:</li>
              {start && <li>Start: {start}</li>}
              {end && <li>End: {end}</li>}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
