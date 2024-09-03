import "./InfoCard.css";

export default function InfoCard({
  id,
  uuid,
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
          {/* user role */}
          {role && <span className="user-status">{role}</span>}

          {/* user name */}
          {userName && <h3 className="info-card-header">{userName}</h3>}

          {/* mail */}
          {email && <p className="info-card-content">{email}</p>}

          {/* skills */}
          {skills && skills.length > 0 && (
            <ul className="skills">
              <li>Skills:</li>
              {skills.map((skill, index) => (
                <li key={index}>
                  <p>
                    {/* <strong>Title:</strong>{" "} */}
                    {skill.protoSkillId.skillCategoryId.skillCategoryTitle} {" / "}
                    {skill.protoSkillId.protoSkillTitle}
                  </p>
                  {/* <p>
                    <strong>Description:</strong>{" "}
                    {skill.protoSkillId.protoSkillDescription}
                  </p> */}
                  {/* <p>
                    <strong>Category:</strong>{" "}
                    {skill.protoSkillId.skillCategoryId.skillCategoryTitle}
                  </p> */}
                  {/* <p>
                    <strong>Category Description:</strong>{" "}
                    {
                      skill.protoSkillId.skillCategoryId
                        .skillCategoryDescription
                    }
                  </p> */}
                  {/* <p>
                    <strong>Proficiency:</strong> {skill.proficiency}
                  </p> */}
                  {/* <p>
                    <strong>Notes:</strong> {skill.notes}
                  </p> */}
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
