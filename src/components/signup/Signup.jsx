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
      navigate("/"); // Redirect to home page after successful sign up
    } catch (error) {
      console.error("Sign up failed:", error);
      setErrorMessage("Sign up failed. Please try again.");
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  

  return (
    <div className="container  mx-auto mt-[80px] h-auto mb-[160px] ">
      <div className="sign-up-container mx-auto  flex  p-2 ">
        <h2 className="pt-5 text-accent text-lg pb-5  ">Sign Up</h2>
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
            className=" mx-auto p-1"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className=" mx-auto p-1"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className=" mx-auto p-1"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className=" mx-auto p-1"
          />

          <label className="w-full mx-auto flex flex-row  ">
            <p className="pb-1 text-accent">Role:</p>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-center"
            >
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
            </select>
          </label>

          <div className="">
            <input
              type="file"
              name="file"
              id="file"
              className="hidden"
              onChange={handleFileChange} 
            />
            <label
              htmlFor="file"
              className="cursor-pointer mb-2 mx-auto rounded-sm text-sm text-white lg:text-lg  text-center  bg-accent text-accent p-2"
            >
              Choose a file
            </label>

            <p className="text-sm  mx-auto text-accent rounded-sm text-center p-2 border mb-2  ">
              {selectedFile
                ? `Selected file: ${selectedFile.name}`
                : "No file selected"}
            </p>
          </div>

          {/* <div className="w-3/4 mx-auto pb-2 ">
            <div className="">
              <FileBase64
                multiple={false}
                onDone={({ base64 }) => setImage(base64)}
              />
            </div>
          </div>  */}
          <button type="submit" className="w-3/4 mx-auto  ">
            Sign Up
          </button>
        </form>

        <ToggleButton
          onToggle={onToggleLogin}
          buttonName="Go back to Login"
          className="button-type-link "
        />
      </div>
    </div>
  );
}

export default SignUp;
