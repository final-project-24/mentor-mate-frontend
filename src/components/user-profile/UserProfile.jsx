// import "./UserProfile.css";
 import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
// import InfoCard from "../info-card/InfoCard.jsx";

 const UserProfile = () => {
   const { isLoggedIn, user } = useAuthContext(); // Use useAuthContext hook to access isLoggedIn state and user object


  return (
    <>
      {isLoggedIn && (
        <div className="user-info flex flex-col-reverse items-center justify-center ">
          <div className="">
            <p> {user.email}</p>
            <p> {user.userName}</p>
            <p>Role: {user.role}</p>
            <p className="hidden">Id: {user.id}</p>
          </div>
          <img src={user.image} alt="User" className="w-1/2"   />
        </div>
      )}
    </>
  );
};

//   return (
//     <>
//       {isLoggedIn && (
//         <div className="user-info">
//           <p>Email: {user.email}</p>
//           <p>Name: {user.userName}</p>
//           <p>Role: {user.role}</p>
//           <p>Id: {user.id}</p>
//           <img src={user.image} alt="User" />
//         </div>
//       )}
//     </>
//   );
// };


 export default UserProfile;
