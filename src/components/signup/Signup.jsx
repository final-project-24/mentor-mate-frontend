import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import "./Signup.css";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx"; //
import { useNavigate } from "react-router-dom"; //

function SignUp({ onSignUp }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [role, setRole] = useState("mentor");
  const [errorMessage, setErrorMessage] = useState("");

  const { signup } = useAuthContext(); // Use useAuthContext hook to access signup method

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      await signup(username, email, password, confirmPassword, role, image); // Use signup method from authentication context

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setImage("");
      setRole("mentor");
      setErrorMessage("");
      navigate("/"); // Redirect to home page after successful sign up
    } catch (error) {
      console.error("Sign up failed:", error);
      setErrorMessage("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="pt-10">Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="userName"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
            </select>
          </label>
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setImage(base64)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
