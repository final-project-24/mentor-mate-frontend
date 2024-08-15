import "./UserProfile.css";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";

const UserProfile = () => {
  const { isLoggedIn, user } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn state and user object

  return (
    <>
      {isLoggedIn && (
        <div className="user-info flex flex-row-reverse items-center justify-center ">
          <div className="">
            <p> {user.email}</p>
            <p> {user.userName}</p>
            <p>Role: {user.role}</p>
            <p className="hidden">Id: {user.id}</p>
          </div>
          <img src={user.image} alt="User"  />
        </div>
      )}
    </>
  );
};

export default UserProfile;
