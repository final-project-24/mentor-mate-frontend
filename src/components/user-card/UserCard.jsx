import "./UserCard.css";

export default function UserCard({ id, image, userName, email, role, skills }) {
  console.log("ID:", id); //
  console.log("Image:", image); //
  console.log("Name:", userName); //
  console.log("Email:", email); //
  console.log("Role:", role); //
  console.log("Skills:", skills); //

  return (
    <>
      <div className="user-card">
        <img className="user-card-image" src={image} alt={userName} />

        <div className="user-card-content">
          <h3 className="user-header">{userName}</h3>
          {role && <span className="user-status">{role}</span>} {/*  */}
          <p className="user-description">{email}</p>
          {/* <ul className="skills">
            <li>Skills:</li>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul> */}
        </div>
      </div>
    </>
  );
}
