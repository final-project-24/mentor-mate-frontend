import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import "./Signup.css";
import { useAuthContext } from "../../store/authentication-context/AuthenticationContext.jsx";
import ToggleButton from "../../components/toggle-button/ToggleButton.jsx";

function SignUp({ onToggleLogin }) {
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
      navigate("/dashboard"); // Redirect to home page after successful sign up
      window.scrollTo(0, 0); // Scroll to the top of the page
    } catch (error) {
      console.error("Sign up failed:", error);
      setErrorMessage("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="container border border-red-600  ">
      <div className="sign-up-container mx-auto w-3/4">
        <h2 className="pt-10 text-accent text-lg pb-4">Sign Up</h2>
        {errorMessage && (
          <p className="sign-up-error-message">{errorMessage}</p>
        )}
        
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
        <ToggleButton
          onToggle={onToggleLogin}
          buttonName="Go back to Login"
          className="button-type-link"
        />
      </div>
    </div>
  );
}

export default SignUp;
