// import React, { useState } from "react";
// import axios from "axios";
// axios.defaults.withCredentials = true;

// function ResetPassword({ token }) {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }
//     try {
//       await axios.post(`http://localhost:4000/app/user/reset-password/${token}`, { password });
//       setMessage("Password has been reset successfully.");
//       setPassword("");
//       setConfirmPassword("");
//     } catch (error) {
//       setMessage("Error resetting password.");
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="New Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default ResetPassword;

import React, { useState } from "react";
import { resetPassword } from "../../utils/api-connector";

function ResetPassword({ token }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      await resetPassword(token, password);
      setMessage("Password has been reset successfully.");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="form-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
